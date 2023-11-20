# uploadscreenshotcomponent

## Installation
To install the upload-screenshot-component into an existing project, use the npm CLI
```
npm install uploadscreenshotcomponent
```

After installation, you can import the component into your project.
```
import UploadScreenshotModal from 'uploadscreenshotcomponent';

Vue.use(UploadScreenshotModal);
```
and implement function to receive upload event
 
```
<UploadScreenshotModal :showUploadScreenshot.sync="uploadModalVisible"
                       @upload="(value1) => uploadScreenShot(value1)"/>
```


### Goals
The primary goal of this library is to provide reusable dialogs for uploading screenshots to the server.
it will grab the screenshot file blob and emit to upload function. you will need to implement the upload function in your project. 


### Demo Page
See [Demo Page](https://jeff42work.github.io/UploadScreenShot/).
