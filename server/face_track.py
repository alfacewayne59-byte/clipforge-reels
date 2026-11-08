import cv2, json, sys
cap=cv2.VideoCapture(sys.argv[1])
if not cap.isOpened(): raise SystemExit("OpenCV could not open video")
fps=cap.get(cv2.CAP_PROP_FPS) or 25.0
cascade=cv2.CascadeClassifier(cv2.data.haarcascades+"haarcascade_frontalface_default.xml")
step=max(1,int(fps*.6)); samples=[]; idx=0; last=.5
while True:
 ok,frame=cap.read()
 if not ok: break
 if idx%step==0:
  gray=cv2.cvtColor(frame,cv2.COLOR_BGR2GRAY)
  faces=cascade.detectMultiScale(gray,scaleFactor=1.12,minNeighbors=5,minSize=(36,36))
  if len(faces):
   x,y,w,h=max(faces,key=lambda f:f[2]*f[3]); last=(x+w/2)/frame.shape[1]
  samples.append({"t":round(idx/fps,3),"x":round(float(last),5)})
 idx+=1
cap.release()
print(json.dumps(samples or [{"t":0,"x":.5}]))
