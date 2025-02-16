import tensorflow as tf
import numpy as np
from tensorflow.keras.models import load_model
import io
from PIL import Image
import os

# Print the current working directory
print("Current working directory:", os.getcwd())

# Construct the absolute path to the model file
model_path = os.path.join(os.path.dirname(__file__), 'certificate_verification_model.h5')
print("Model path:", model_path)

# Load the trained model
model = load_model(model_path)

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}  # Allowed file types

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def predict_certificate(file):
    try:
        # Read image and convert to RGB (remove transparency)
        img_bytes = io.BytesIO(file.read())
        img = Image.open(img_bytes).convert("RGB")  # Convert to RGB to avoid 4-channel errors
        img = img.resize((224, 224))  # Resize to match model input

        # Convert image to numpy array
        img_array = np.array(img)
        img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension
        img_array = img_array / 255.0  # Normalize pixel values

        # Predict using the model
        prediction = model.predict(img_array)
        result = "Real" if prediction[0] > 0.5 else "Fake"

        return {'prediction': result}

    except Exception as e:
        return {'error': f'Processing error: {str(e)}'}