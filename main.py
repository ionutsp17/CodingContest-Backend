from flask import Flask, Response, request
from streamManager import StreamManager
import patientsRepository
from ai_module.facial_expression.facial_expression_model_inference import *

app = Flask(__name__)
streamManager = StreamManager()

def gen(streamable):
    while True:
        byte_frame, frame = streamable.get_frame()

        # Work in progress
        # predicted_frame = expression_model_inference(frame)
        # predicted_frame = activity_model_inference(frame)
        
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + byte_frame + b'\r\n')


@app.route('/videoFeed')
def videoFeed():
    sourceIndex = request.args.get('sourceIndex', default=0, type=int)
    return Response(gen(streamManager.getStreamableSource(sourceIndex)),
                    mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/getAllPatients')
def getAllPatiens():
    return 'patients json' """Response(patientsRepository.getPatientsList())"""

if __name__ == '__main__':
    """Run in debug mode"""
    app.run(port=4996, debug=True, threaded=True)

    """Run for prod"""
    """ app.run(host='0.0.0.0', port=500, threaded=True)"""
