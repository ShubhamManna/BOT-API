# BOT-API
This is the REST API for the <a href='https://discord.com/api/oauth2/authorize?client_id=842340656831135754&permissions=0&scope=bot' target='_blank'>Discord BOT MARK </a>.

<h3>About</h3>
<p align="justify"> The Node.Js REST API has various endpoints with various states supporting different types of requests like GET, POST & PUT. Currently the BOT is in it's version 1.0.0, it has completed the testing phase and is now avaialbe to use in your various Discord servers. <a href='https://discord.com/api/oauth2/authorize?client_id=842340656831135754&permissions=0&scope=bot' target='_blank'>Click here</a> to add the bot your discord server. Currenlty the BOT is only accessing one endpoint of the API - <a href='https://bot-api-thedssaved-gmailcom.vercel.app/data/todo/' target='_blank'>/data/todo</a></p>

<h3>Endpoints</h3>
<p>
  <ol>
    <li><a href='https://bot-api-thedssaved-gmailcom.vercel.app/data/todo/' target='_blank'>  /data/todo</a></li>
    <p align="justify"> This endpoint is currently linked to my firebase, so any GET/POST/PUT request affects my firebase firestore database. 
      <ul>
        <li>A GET request to <code>/data/todo/</code> results in generating a JSON of all the of the ToDo items added.</li>
        <li>A GET request to <code>/data/todo/:date</code> results in ToDo items only for a specified date.</li>
        <li>A POST request to <code>/data/todo</code> with the reuired headers and body results in the addition of a new ToDo for the current date.</li>
        <li>A PUT request to <code>/data/todo/:id</code> with the required headers and body results in completing a ToDo item.</li>
      </ul>
    </p>
  </ol>
</p>
In future, i wish to add more endpoints to this exisiting API so that the BOT can access more functionalities.
