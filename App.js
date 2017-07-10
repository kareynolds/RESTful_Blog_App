var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    methodOverride = require("method-override"),
    expressSanitizer      = require("express-sanitizer");
    


            // APP CONFIG
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(expressSanitizer());

mongoose.connect("mongodb://localhost/restful_blog_app");




            // MONGOOSE MODEL CONFIG
// Create a new Blog Schema defines what the object will be

var Blog = new mongoose.Schema ({
    title: String,
    image: String, //{type: String, default: "placeholder.jpg"} for a default image
    body: String,
    created: {type: Date, default: Date.now}
});

// Mongoose compiles the Schema into a model, useable object
var Blog = mongoose.model("Blog", Blog);


// Creates a sample blog
/*Blog.create({
    title: "How I taught my dog to code",
    image: "data:image/jpeg;base64,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",
    body: "Well, not exactly. If he had aposible thumbs, could talk, sit upright for a period of time or focus on anything longer than a second",
    
})
*/



            //RESTFUL ROUTES

app.get("/", function(req, res){
    res.redirect("/blogs");
})

//INDEX ROUTE

app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
        if(err) {
            console.log(err)
        } else {
            res.render("index.ejs", {blogs: blogs});
        }
    })
})




// PUTTING THE C IN CRUD
//ADD NEW ROUTE
//ADD NEW TEMPLATE
//ADD CREATE ROUTE
//ADD CREATE TEMPLATE


app.get("/blogs/new", function(req, res){
    res.render("new.ejs");
})

        //CREATE ROUTE
        
app.post("/blogs", function(req, res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            res.render("new.ejs");
        } else{
            res.redirect("/blogs");
        }
    })
})




//SHOWtime
// * add a show route
//* add show template
// add links to show page
// style show template


app.get("/blogs/:id", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            console.log(err)
        }else {
            res.render("show.ejs", {blog: foundBlog});
        }
    })
})

app.get("/blogs/:id/edit", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            console.log(err)
        } else {
            res.render("edit.ejs", {blog: foundBlog})
        }
    })

})

// UPDATE ROUTE

app.put("/blogs/:id", function(req, res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err){
            console.log(err)
        } else {
            res.redirect("/blogs/" + req.params.id);
        }
    })
})




// DELETE ROUTE 

app.delete("/blogs/:id", function(req, res){
    Blog.findByIdAndRemove(req.params.id, req.body.blog, function(err){
        if(err){
            console.log(err)
        } else {
            res.redirect("/blogs")
        }
        
    })
})






app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is running");
})
