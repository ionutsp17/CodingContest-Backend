
class Patient(object):
    def __init__(self, firstName, lastName, illnesses, cameraIndex):
        self.firstName = firstName
        self.lastName = lastName
        self.cameraIndex = cameraIndex
        self.illnesses = illnesses

def getPatientsList():
    return [
        Patient("Gica", "Craioveanul", ["Cardiac", "Hypertension"], 0),
        Patient("Gica", "Craioveanul", ["Cardiac", "Hypertension"], 1),
        Patient("Gica", "Craioveanul", ["Cardiac", "Hypertension"], 2),
    ]
