
const int PIN_PRZYCISK_L = 22; 
const int PIN_LAMPA_L = 23;    
const int PIN_PRZYCISK_P = 53; 
const int PIN_LAMPA_P = 52;    


bool polaczonoZPC = false;
bool graAktywna = false;
bool blokadaGry = false;


unsigned long ostatniSygnalPC = 0;
const unsigned long TIMEOUT_POLACZENIA = 3000;
unsigned long poprzednieMiganie = 0;
bool stanMigania = LOW;

void setup() {
  Serial1.begin(9600); 
  Serial.begin(9600);  
  pinMode(PIN_PRZYCISK_L, INPUT_PULLUP);
  pinMode(PIN_PRZYCISK_P, INPUT_PULLUP);
  pinMode(PIN_LAMPA_L, OUTPUT);
  pinMode(PIN_LAMPA_P, OUTPUT);

  Serial.println("System gotowy. Czekam na sygnał z JS...");
}

void loop() {
  if (polaczonoZPC && (millis() - ostatniSygnalPC > TIMEOUT_POLACZENIA)) {
    polaczonoZPC = false;
    graAktywna = false;
    Serial.println("UTRACOŁO POŁĄCZENIE!");
  }

  if (!polaczonoZPC) {
    miganieOczekiwania(); 
    sprawdzCzyPCWrocil();
  } else {
    obslugaKomendPC();
    obslugaPrzyciskow();
  }
}

void miganieOczekiwania() {
  if (millis() - poprzednieMiganie >= 250) {
    poprzednieMiganie = millis();
    stanMigania = !stanMigania;
    digitalWrite(PIN_LAMPA_L, stanMigania);
    digitalWrite(PIN_LAMPA_P, stanMigania);
  }
}

void sprawdzCzyPCWrocil() {
  if (Serial1.available() > 0) {
    while(Serial1.available()) Serial1.read(); 
    polaczonoZPC = true;
    ostatniSygnalPC = millis();
    uruchomSekwencjePowitalna();
  }
}

void uruchomSekwencjePowitalna() {
  digitalWrite(PIN_LAMPA_L, HIGH);
  digitalWrite(PIN_LAMPA_P, HIGH);
  delay(2000); 
  digitalWrite(PIN_LAMPA_L, LOW);
  digitalWrite(PIN_LAMPA_P, LOW);
  graAktywna = true;
}

void obslugaKomendPC() {
  if (Serial1.available() > 0) {
    ostatniSygnalPC = millis(); 
    char komenda = Serial1.read();
    
    if (komenda == '0') { 
      blokadaGry = false;
      digitalWrite(PIN_LAMPA_L, LOW);
      digitalWrite(PIN_LAMPA_P, LOW);
    }
    else if (komenda == '1') { digitalWrite(PIN_LAMPA_L, HIGH); digitalWrite(PIN_LAMPA_P, LOW); blokadaGry = true; }
    else if (komenda == '2') { digitalWrite(PIN_LAMPA_L, LOW); digitalWrite(PIN_LAMPA_P, HIGH); blokadaGry = true; }
  }
}

void obslugaPrzyciskow() {
  if (!blokadaGry && graAktywna) {
    if (digitalRead(PIN_PRZYCISK_L) == LOW) {
      blokadaGry = true;
      digitalWrite(PIN_LAMPA_L, HIGH);
      Serial1.println("L"); 
    }
    else if (digitalRead(PIN_PRZYCISK_P) == LOW) {
      blokadaGry = true;
      digitalWrite(PIN_LAMPA_P, HIGH);
      Serial1.println("P");
    }
  }
}