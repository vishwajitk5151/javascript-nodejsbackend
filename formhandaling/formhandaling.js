// handle backend process of the forms and making sure the data coming from any frontend lib ,fw , templating , we still handle it at the backend proceess
//it also work as middleware  as it is sending the backend data from on to another it send unreadable firl called blob
app.use(express.json());  // both line are use to converter to bob to readable file
app.use(express.urlencoded({ extended: true }))