import re
import os
import cv2
import numpy as np
import easyocr
import pytesseract
from PIL import Image
from langdetect import detect
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
import pickle
from flask import current_app
from werkzeug.utils import secure_filename

# Download necessary NLTK resources
import nltk
nltk.download('punkt')
nltk.download('stopwords')

# Get the directory of the current file
current_dir = os.path.dirname(os.path.abspath(__file__))

# Initialize EasyOCR for English
reader = easyocr.Reader(["en"])

# Construct the absolute paths to the model and vectorizer files
model_path = os.path.join(current_dir, '../models/sports_identifier.pkl')
vectorizer_path = os.path.join(current_dir, '../models/tfidf_vectorizer.pkl')

# Load the trained model and vectorizer
model = pickle.load(open(model_path, "rb"))
vectorizer = pickle.load(open(vectorizer_path, "rb"))

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in current_app.config['ALLOWED_EXTENSIONS']

def preprocess_image(image_path):
    """Enhances image quality for better OCR recognition."""
    img = cv2.imread(image_path)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    binary = cv2.adaptiveThreshold(gray, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 11, 2)
    kernel = np.ones((1, 1), np.uint8)
    binary = cv2.morphologyEx(binary, cv2.MORPH_CLOSE, kernel)
    gaussian = cv2.GaussianBlur(binary, (0, 0), 3)
    sharpened = cv2.addWeighted(binary, 1.5, gaussian, -0.5, 0)
    return sharpened

def clean_text(text):
    """Cleans the extracted text to create a human-readable description."""
    text = re.sub(r'\d+', '', text)
    text = re.sub(r'[^\w\s]', '', text)
    text = re.sub(r'(?i)\b(natmnal|natmnl|naton|nati|natal)\b', 'National', text)
    text = re.sub(r'(?i)\b(yavuth|youthh|youh|yuoth|yut)\b', 'Youth', text)
    text = re.sub(r'(?i)\b(fedetalion|federatuon|faderation|fede)\b', 'Federation', text)
    text = re.sub(r'(?i)\b(mlimishy|millishy|milishy)\b', 'Ministry', text)
    text = re.sub(r'(?i)\b(sertificate|cerificate|certficate|certifiate)\b', 'Certificate', text)
    text = re.sub(r'(?i)\b(partcipation|participatoin|particpation)\b', 'Participation', text)
    text = re.sub(r'(?i)\b(competiion|competion|compitition|competitiion)\b', 'Competition', text)
    text = re.sub(r'(?i)\b(athleic|athltic|atletic|athleetic)\b', 'Athletic', text)
    text = re.sub(r'(?i)\b(dvison|divison|divsion|divisin)\b', 'Division', text)
    text = re.sub(r'(?i)\b(meet|meetng|meett|mmet)\b', 'Meet', text)
    text = re.sub(r'(?i)\b(winnr|winr|winer|winneer)\b', 'Winner', text)
    text = re.sub(r'(?i)\b(runnr|runer|runneer|rnner)\b', 'Runner', text)
    text = re.sub(r'(?i)\b(posiion|psition|postion|positon)\b', 'Position', text)
    text = re.sub(r'(?i)\b(plyer|plaer|playr|plaayer)\b', 'Player', text)
    text = re.sub(r'(?i)\b(sports|sportss|spor|sprot)\b', 'Sports', text)
    text = re.sub(r'(?i)\b(champion|champin|chapion|championn)\b', 'Champion', text)
    text = re.sub(r'(?i)\b(offcial|oficial|offiial|officail)\b', 'Official', text)
    text = re.sub(r'(?i)\b(tournment|tornament|tounament|tournamant)\b', 'Tournament', text)
    text = re.sub(r'(?i)\b(couch|cach|coah|coch)\b', 'Coach', text)
    text = re.sub(r'(?i)\b(traning|trainng|trianing|traing)\b', 'Training', text)
    text = re.sub(r'(?i)\b(orgnizer|organzer|organizr|oraganizer)\b', 'Organizer', text)
    text = re.sub(r'(?i)\b(preformnce|performence|perfrmance|prformance)\b', 'Performance', text)
    text = re.sub(r'(?i)\b(represntative|represenative|representtive|represetative)\b', 'Representative', text)
    text = re.sub(r'(?i)\b(silver|silvr|silveer|slver)\b', 'Silver', text)
    text = re.sub(r'(?i)\b(bronze|bronse|broze|broonze)\b', 'Bronze', text)
    text = re.sub(r'(?i)\b(gold|goold|golld|goldd)\b', 'Gold', text)
    text = re.sub(r'(?i)\b(medal|medl|meedal|medall)\b', 'Medal', text)
    text = re.sub(r'(?i)\b(qualify|qualfy|qualifi|qualifay)\b', 'Qualify', text)
    text = re.sub(r'(?i)\b(event|evnt|evennt|eveent)\b', 'Event', text)
    text = re.sub(r'(?i)\b(degree|dgree|degreee|dgreee)\b', 'Degree', text)
    text = re.sub(r'(?i)\b(judg|judg|judgge|judje)\b', 'Judge', text)
    text = re.sub(r'(?i)\b(official|offiial|offiicial|oficial)\b', 'Official', text)
    text = re.sub(r'(?i)\b(assocation|associaton|assoication|asociation)\b', 'Association', text)
    text = re.sub(r'(?i)\b(certify|certfy|cerify|certiffy)\b', 'Certify', text)
    stop_words = set(stopwords.words('english'))
    word_tokens = text.split()
    filtered_text = [word for word in word_tokens if word.lower() not in stop_words]
    cleaned_text = ' '.join(filtered_text)
    return cleaned_text

def extract_text(image_path):
    """Extracts text from certificate using improved OCR settings."""
    img = preprocess_image(image_path)
    pil_img = Image.fromarray(img)
    text_sample = pytesseract.image_to_string(pil_img, lang="eng")[:100]
    detected_lang = detect(text_sample)
    if detected_lang == "si":
        extracted_text = pytesseract.image_to_string(pil_img, lang="sin+eng")
    else:
        extracted_text = " ".join(reader.readtext(image_path, detail=0))
    return extracted_text

def predict_category(text):
    """Predicts the category of the given text using the trained model."""
    text = text.lower()
    text_tfidf = vectorizer.transform([text])
    prediction = model.predict(text_tfidf)
    return prediction[0]

def predict_certificate(file, user_certificate_id):
    filename = secure_filename(file.filename)
    upload_folder = current_app.config["UPLOAD_FOLDER"]
    file_path = os.path.join(upload_folder, filename)
    
    # Ensure the upload directory exists
    if not os.path.exists(upload_folder):
        os.makedirs(upload_folder)
    
    file.save(file_path)
    extracted_text = extract_text(file_path)
    print("Extracted Text:", extracted_text)  # Debugging statement
    cleaned_text = clean_text(extracted_text)
    print("Cleaned Text:", cleaned_text)  # Debugging statement
    
    # Extract certificate ID from the cleaned text
    extracted_certificate_id = extract_certificate_id(extracted_text, user_certificate_id)

    print("Extracted Certificate ID:", extracted_certificate_id)  # Debugging statement
    
    # Predict the category of the cleaned text
    prediction = predict_category(cleaned_text)
    print("Prediction:", prediction)  # Debugging statement
    
    return {
        'certificate_id_match': extracted_certificate_id == user_certificate_id,
        'prediction': prediction
    }

def extract_certificate_id(extracted_text, user_certificate_id):
    """Checks if the user-entered certificate ID is present in the extracted text."""
    # Escape the user input to safely use it in regex
    user_certificate_id = re.escape(user_certificate_id)
    
    # Search for the exact user-entered number in the text
    match = re.search(rf'\b{user_certificate_id}\b', extracted_text)
    
    # Return the matched ID if found, otherwise None
    return user_certificate_id if match else None
