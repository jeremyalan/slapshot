# slapshot
Takes web screenshots at various sizes


## Configuration

### Common

This section contains the configuration that applies to all the screens.

#### Options

<table>
   <tr>
      <td>baseUrl</td>
      <td>
         The base URL, which will be prepended to all the screen paths to generate the screenshot.
      </td>
   </tr>
   <tr>
      <td>queryParams.*</td>
      <td>
         Contains a list of key-value pairs that will be appended to the URL of each page as query parameters.
      </td>
   </tr>
   <tr>
      <td>options.*</td>
      <td>
         Contains additional options, that will be passed to the screenshot service.<br/>
         https://www.npmjs.com/package/electron-screenshot-service 
      </td>
   </tr>
</table>


Sample usage:
```yaml
baseUrl: https://www.example.com
queryParams:
  sessionKey: b9f57f10-819a-4f1e-a5fa-e43a1492b17a
```

### Screens

This section describes the screens you want to capture.  Hopefully, you're using server-side rendering
or a JavaScript routing library for your app that allows you to navigate directly to a particular part 
of your application without manually clicking through the UI.  This is usually an opportunity to grab 
a few screens that highlight specific functionality within your app.

#### Options

<table>
   <tr>
      <td>name</td>
      <td>
         The name of the screen.<br/>
         This value is used when generating filenames for the output files, for easy identification.
      </td>
   </tr>
   <tr>
      <td>path</td>
      <td>
         The relative path to the screen.<br/>
         This path will be appended to the Base URL provided in the top-level configuration.
      </td>
   </tr>
   <tr>
      <td>options.css</td>
      <td>
         Allows you to include custom styles on the page before capturing the screenshot.
      </td>
   </tr>
   <tr>
      <td>options.js</td>
      <td>
         Allows you to run a custom script on the page before capturing the screenshot.
      </td>
   </tr>
   <tr>
      <td>options.*</td>
      <td>
         Contains additional options, that will be passed to the screenshot service.<br/>
         https://www.npmjs.com/package/electron-screenshot-service
      </td>
   </tr>
</table>


Sample usage:
```yaml
screens:
  - name: Home
    path: /home
  
  - name: Login
    path: /login
```

### Screen Sizes

This section allows you to specify device sizes that you want to generate screens for.  Please note that
this is the pixel size of the viewport in the browser, not the resolution of the resulting image.  In order 
to comply with Apple's image sizes, you may need to scale these images accordingly.

#### Options

<table>
   <tr>
      <td>width</td>
      <td>
         The width of the viewport.
      </td>
   </tr>
   <tr>
      <td>height</td>
      <td>
         The height of the viewport.
      </td>
   </tr>
</table>


Sample usage:
```yaml
sizes:
  - width: 320
    height: 568
  - width: 375
    height: 667
```
