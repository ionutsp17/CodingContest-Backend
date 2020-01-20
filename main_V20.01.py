from flask import Flask, Response, request
from streamManager import StreamManager
import patientsRepository
from ai_module.facial_expression.facial_expression_model_inference import *
from keras.models import load_model
import tensorflow as tf
from keras.models import model_from_json
import pickle

#from flask_socketio import SocketIO, emit

app = Flask(__name__)
streamManager = StreamManager()

FACIAL_DETECT_MODEl_W_PATH = r'ai_module\facial_expression\facial_expression_model_train.h5'
ACTIVITY_DETECT_MODEL_PATH = r'ai_module\activity_recognition\fall_3dcnnmodel-gpu.hd5'
tf.keras.backend.clear_session()

emotion_model = None
activity_model = None


def load_ai_models():
    # Load the model previously trained
    global activity_model
    activity_model = load_model(ACTIVITY_DETECT_MODEL_PATH)

    global emotion_modeld
    emotion_model = build_model()
    emotion_model.load_weights(FACIAL_DETECT_MODEl_W_PATH)
    print("Loaded models from disk")

def gen(streamable):
    while True:
        byte_frame, frame = streamable.get_frame()

        if frame is None:
            continue

        # Send frame to AI modules
        # predicted_frame = expression_model_inference(emotion_model, frame)
        # predicted_frame2 = activity_model_inference(activity_model, frame)

        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + byte_frame + b'\r\n')


@app.route('/')
def videoFeed():
    sourceIndex = request.args.get('sourceIndex', default=0, type=int)
    return Response(gen(streamManager.getStreamableSource(sourceIndex)),
                    mimetype='multipart/x-mixed-replace; boundary=frame')


if __name__ == '__main__':
    # print("============== Loading ai models...")
    # load_ai_models()
    # print("============== Loading ai models - DONE!")

    """Run in debug mode"""
    # app.run(port=4996, debug=True, threaded=True)

    """Run for prod"""
    #app.run(host='0.0.0.0', port=500, threaded=True)
    app.run(host='0.0.0.0', port=8099, threaded=False)

