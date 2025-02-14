from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np
from tensorflow.keras.models import load_model
import io
from PIL import Image
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load the trained model
model = load_model('certificate_verification_model.h5')

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}  # Allowed file types

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/predict', methods=['POST'])
def predict():
    if 'certificate' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    file = request.files['certificate']
    
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if not allowed_file(file.filename):
        return jsonify({'error': 'Invalid file type. Only PNG, JPG, and JPEG are allowed.'}), 400

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

        return jsonify({'prediction': result})

    except Exception as e:
        return jsonify({'error': f'Processing error: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(debug=True)
