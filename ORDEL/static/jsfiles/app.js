const store = new Vuex.Store({
    state: {
      username:"",
      societyname:"",
      dry_wet:0,
      key:"",
      premium:false,
      plastic:false,
      cardboard:false,
      polybags:false,
      loggedIn:false,
      usertype:1,
    },
    mutations: {
  
    }
  })
  
  const homepage = {
    methods:{
      login: function(){
        this.$router.push('/userlogin')
      },
    },
    template:`<div> <br><br>
              <div v-show="this.$store.state.loggedIn"> <h1>Welcome {{this.$store.state.username}} </h1></div>
              <img src="./static/Kudawala.GIF">  
                <br><br></div>`
  }
  
  const contactus = {
    methods:{
    },
    template:`<div>Reach out to us at PARADOX 2022</div>`
  }
  
  const testimonials = {
    methods:{
    },
    template:`<div>Waiting for your testimonials😊</div>`
  }
  
  const login = {
    data: function() {
      return {userusername:"",
              userpassword:"",
              societyname:"",
              usertype:0,
              radio11:"1",
            }
          },
    methods:{
      submit: async function(){
        if(this.userusername=="" || this.userpassword==""){
          alert("The Username and password should not be blank");
        }
        else if(this.userusername.search('/') != -1 || this.userpassword.search('/') != -1){
          alert("The Username and Password should not contain '/' character");
        }
        else{
          if(this.radio11=="2"){
            this.societyname="-1";
          }
          url="/api/login/"+this.userusername+"/"+this.userpassword+"/"+this.societyname;
          a= await fetch(url);
          response=await a.json();
          if(response.key){
            this.$store.state.premium=false;
            this.$store.state.loggedIn=true;
            this.$store.state.key=response.key;
            this.$store.state.username=this.userusername;
            this.$store.state.societyname=this.societyname;
            if(response.type==1){
              this.$store.state.usertype=1;
              this.$router.push('/')
            }
            else if(response.type==2){
              this.$store.state.usertype=2;
              this.$router.push('/employeepage')
            }
            else if(response.type==3){
              this.$store.state.usertype=3;
              this.$router.push('/adminpage')
            }
            else if(response.type==4){
              this.$store.state.usertype=4;
              this.$store.state.premium=true
              this.$router.push('/')
            }
          }
          else{
            this.$store.state.usertype=0;
            alert("Invalid Credentials")
          }
        }
      }
    },
    template:`<div>
      <br><br><br><br><br>
      <div class="container-sm">
            <div class="row">
              <div class="col">
                <img src="./static/new.png">
              </div>
              <div class="col" style="background-color:white;">
              <div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" name="inlineRadioOptions" value="1" v-model="radio11">
                  <label class="form-check-label" for="inlineRadio1">User</label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" name="inlineRadioOptions" value="2" v-model="radio11">
                  <label class="form-check-label" for="inlineRadio2">Employee</label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" name="inlineRadioOptions" value="3" v-model="radio11">
                  <label class="form-check-label" for="inlineRadio1">Community Admin</label>
                </div>
              </div>
                <br>
                <label for="exampleFormControlInput3" class="form-label" v-if="radio11 === '1' || radio11 === '3'">Society Name</label>
                <input class="form-control" id="exampleFormControlInput3" v-model="societyname" v-if="radio11 === '1' || radio11 === '3'"><br>
                <label for="exampleFormControlInput1" class="form-label">Username</label>
                <input class="form-control" id="exampleFormControlInput1" v-model="userusername"><br>
                <label for="exampleFormControlInput2" class="form-label">Password</label>
                <input class="form-control" id="exampleFormControlInput2" v-model="userpassword" input type = "password"><br>
                <button type="button" class="btn btn-primary" v-on:click="submit">Submit</button><br><br>
              </div>
            </div>
        </div>
      </div>`
            }
  
  const adminpage = {
    data: function() {
      return {
        adduser:false,
        removeuser:false,
        addemployee:false,
        viewreport:false,
        addusername:"",
        addpassword:"",
        houseowner:"",
        currentlyoccupied:"",
        doorno:"",
        phone:"",
        alternatephone:"",
        email:"",
        removeusername:"",
        addempname:"",
        addemppassword:"",
      }
    },
    methods:{
      op1: function(){
        this.adduser=true;
        this.removeuser=false;
        this.viewreport=false;
        this.addemployee=false;
      },
      op2: function(){
        this.adduser=false;
        this.removeuser=true;
        this.viewreport=false;
        this.addemployee=false;
      },
      op3: function(){
        this.adduser=false;
        this.removeuser=false;
        this.viewreport=true;
        this.addemployee=false;
      },
      op4: function(){
        this.adduser=false;
        this.removeuser=false;
        this.viewreport=false;
        this.addemployee=true;
      },
      reset: function(){
        this.addusername="";
        this.addpassword="";
        this.houseowner="";
        this.currentlyoccupied="";
        this.phone="";
        this.alternatephone="";
        this.email="";
        this.doorno="";
      },
      register: async function(){
        if(this.addusername==""||this.addpassword==""||this.phone==""||this.alternatephone==""||this.houseowner==""||this.doorno==""||this.currentlyoccupied==""){
          alert("Excluding emial all other fields needs to be filled");
        }
        else{
          url="/api/admin/adduser/"+this.$store.state.username+"/"+this.$store.state.key+"/"+this.addusername+"/"+this.$store.state.societyname+"/"+this.addpassword+"/"+"1"+"/"+this.houseowner+"/"+this.currentlyoccupied+"/"+this.doorno+"/"+this.phone+"/"+this.alternatephone+"/"+this.email;
          a= await fetch(url);
          response=await a.json();
          console.log(response);
          alert("User added");
          this.reset();
        }
      },
      remove: async function(){
        if(this.removeusername==""){
          alert("Provide Username of the user to be removed")
        }
        else{
          url="/api/admin/deleteuser/"+this.$store.state.username+"/"+this.$store.state.key+"/"+this.removeusername+"/"+this.$store.state.societyname;
          a= await fetch(url);
          response=await a.json();
          console.log(response);
          alert(response);
          this.removeusername="";
        }
      },
      resetemp: function(){
        this.addempname="";
        this.addemppassword="";
        this.addempsociety="";
      },
      registeremp: async function(){
        url="/api/addemployee/"+this.$store.state.username+"/"+this.$store.state.key+"/"+this.addempname+"/"+this.$store.state.societyname+"/"+this.addemppassword;
        a= await fetch(url);
        response=await a.json();
        if(response == "Username Already Used" || response == "User Added"){
            alert(response);
            this.addempname="";
            this.addemppassword="";
        }
        else{
          alert("Unauthorized User")
        }
      }
    },
    template:`  <div>
      <div style="margin: 2%;">
        <h1>Admin View</h1><br>
        <h4>Select your action</h4>  
        <div class="dropdown" style="padding: 2%;">
          <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
            Select an action
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li><button class="dropdown-item" v-on:click="op1">Add User</button></li>
            <li><button class="dropdown-item" v-on:click="op2">Remove User</button></li>
            <!-- <li><button class="dropdown-item" v-on:click="op4">Add Employee</button></li>
            // <li><button class="dropdown-item" v-on:click="op3">View Report</button></li> -->
          </ul>
        </div>
        <br><br>
  
        <!-- This code is for adding a new user by the Admin -->
        
        <div v-show="adduser">
        <h4>New User Details</h4><br>
          <div class="container-sm border rounded" style="padding: 2%;">
            <div class="input-group input-group-sm mb-3">
                <span class="input-group-text" style="width: 30%" id="inputGroup-sizing-sm">House Owner</span>
                <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" v-model="houseowner">
            </div>
            <div class="input-group input-group-sm mb-3">
                <span class="input-group-text" style="width: 30%" id="inputGroup-sizing-sm" >Currently Occupied By</span>
                <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" v-model="currentlyoccupied">
            </div>
            <div class="input-group input-group-sm mb-3">
                <span class="input-group-text" style="width: 30%" id="inputGroup-sizing-sm">Door Number</span>
                <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" v-model="doorno">
            </div>
            <div class="input-group input-group-sm mb-3">
                <span class="input-group-text" style="width: 30%" id="inputGroup-sizing-sm">Phone Number</span>
                <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" v-model="phone">
            </div>
            <div class="input-group input-group-sm mb-3">
                <span class="input-group-text" style="width: 30%" id="inputGroup-sizing-sm">Alternate Phone Number</span>
                <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" v-model="alternatephone">
            </div>
            <div class="input-group input-group-sm mb-3">
                <span class="input-group-text" style="width: 30%" id="inputGroup-sizing-sm">eMail ID</span>
                <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" v-model="email">
            </div>
            <div class="input-group input-group-sm mb-3">
              <span class="input-group-text" style="width: 30%" id="inputGroup-sizing-sm">Username</span>
              <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" v-model="addusername">
            </div>
            <div class="input-group input-group-sm mb-3">
              <span class="input-group-text" style="width: 30%" id="inputGroup-sizing-sm">Password</span>
              <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" v-model="addpassword">
            </div>
            <div style="text-align: center; padding: 2%;">
                <button class="btn btn-primary me-md-2" type="button" style="width: auto; " v-on:click="reset">Reset</button>
                <button class="btn btn-primary" type="button" style="width: auto;" v-on:click="register">Register</button>
            </div>
          </div>
        </div>
  
  
        <!-- This code is for Removing a User by the admin -->
        <div v-show="removeuser">
        <h4>Remove a User</h4><br>
        <div >
          <div class="container-sm border rounded" style="padding: 2%;">
            <div class="input-group input-group-sm mb-3">
              <span class="input-group-text" style="width: 30%" id="inputGroup-sizing-sm">Username</span>
              <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" v-model="removeusername">
            </div>
            <div style="text-align: center; padding: 2%;">
                <button class="btn btn-primary" type="button" style="width: auto;" v-on:click="remove">Submit</button>
            </div>
          </div>
        </div>
        </div>
  
        <div v-show="addemployee">
        <h4>New Employee Details</h4><br>
          <div class="container-sm border rounded" style="padding: 2%;">
            <div class="input-group input-group-sm mb-3">
                <span class="input-group-text" style="width: 30%" id="inputGroup-sizing-sm" >Username</span>
                <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" v-model="addempname">
            </div>
            <div class="input-group input-group-sm mb-3">
                <span class="input-group-text" style="width: 30%" id="inputGroup-sizing-sm">Password</span>
                <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" v-model="addemppassword">
            </div>
            <div style="text-align: center; padding: 2%;">
                <button class="btn btn-primary me-md-2" type="button" style="width: auto; " v-on:click="resetemp">Reset</button>
                <button class="btn btn-primary" type="button" style="width: auto;" v-on:click="registeremp">Register</button>
            </div>
          </div>
        </div>
  
        <!-- This code is for Removind a User by the admin -->
        <div v-show="viewreport">
        <h4>Report View</h4><br>
        <div >
          <div class="container-sm border rounded" style="padding: 2%;">
            <div class="input-group input-group-sm mb-3">
              <span class="input-group-text" style="width: 30%" id="inputGroup-sizing-sm">Select a type of Report</span>
              <div class="dropdown" style="width: 70%">
                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" style="width: 100%;text-align: end;">
                  
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1" style="width: 100%;">
                  <li><a class="dropdown-item" href="#">Add User</a></li>
                  <li><a class="dropdown-item" href="#">Remove User</a></li>
                  <li><a class="dropdown-item" href="#">View Report</a></li>
                </ul>
              </div>
            </div>
            <div style="text-align: center; padding: 2%;">
                <button class="btn btn-primary" type="button" style="width: auto;">Submit</button>
            </div>
          </div>
        </div>
        </div>
  
  
      </div>
      </div>`
  }
  
  const employeepage = {
    data: function() {
      return {
        bookings:[],
        available:false,
      }
    },
    methods:{
      pickup: async function(i){
        this.$router.push('/pickuppage/'+this.bookings[i].username+'/'+this.bookings[i].societyname+'/'+this.bookings[i].dry_wet_both)
      }
    },
    beforeMount: async function(){
      url="/api/employee/bookings/"+this.$store.state.username+"/"+this.$store.state.societyname+"/"+this.$store.state.key;
      a= await fetch(url);
      response=await a.json();
      if(response=="Unauthorized User"){
        alert(response)
      }
      else if(response=="No Bookings Available"){
        this.available=false;
      }
      else{
        this.bookings=response;
        this.available=true;
      }
    },
    template:`<div>
                <div class="container-sm">
              <h1>Employee View</h1><br>
              <h4>Click on the booking to know more about that</h4>
              <h4>Current Bookings</h4><br>
              <div >
                <div v-show="!(available)"><h3>No Bookings Available</h3></div>
                <table class="table table-hover" style="width:75%" align="center" v-show="available">
                  <thead>
                    <tr>
                      <th scope="col">Booking #</th>
                      <th scope="col">Society Name</th>
                      <th scope="col">User Name</th>
                      <th scope="col">Time Stamp</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(booking, index) in bookings" :key="index">
                      <th scope="row">{{booking.booking_id}}</th>
                      <td>{{booking.societyname}}</td>
                      <td>{{booking.username}}</td>
                      <td>{{booking.timestamp}}</td>
                      <td><button type="button" class="btn btn-primary" v-on:click="pickup(index)">Accept</button></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            </div>`
  }
  
  const userpage = {
    data: function() {
      return {
        dry:false,
        wet:false,
        premium:true,
      }
    },
    methods:{
      proceed: async function(){
        url="/api/login/"+this.userusername+"/"+this.userpassword+"/"+this.societyname;
        a= await fetch(url);
        response=await a.json();
  
  
        if(this.dry && this.wet){
          this.$store.state.dry_wet=3
          this.$router.push('/userpage/wastetype')
        }
        else if(this.dry){
          this.$store.state.dry_wet=1
          this.$router.push('/userpage/wastetype')
        }   
        else if(this.wet){
          this.$store.state.dry_wet=2
          this.$router.push('/userpage/wastetype')
        }
        else{
          alert("Please select atleast one waste type");
        } 
      },
      stats: function(){
        this.$router.push('/userpage/stats')
      }
    },
    template:`<div>
      <br><br><br>
      <h1>Welcome {{this.$store.state.username}}</h1><br>
        <div class="container-sm">
            <div class="row">
              <div class="col">
                <img src="./static/new.png">
              </div>
              <div class="col" style="text-align:left; background-color:white ;"> 
            <h2>Type Of Garbage</h2><br>
                <input class="form-check-input me-1" type="checkbox" value="" aria-label="..." v-model="dry">
                Dry Waste
                <br><br>
                <input class="form-check-input me-1" type="checkbox" value="" aria-label="..." v-model="wet">
                Wet Waste   
                <br><br>
              <button type="button" class="btn btn-primary" v-on:click="proceed">Proceed</button>
  
  
              <button type="button" class="btn btn-primary" v-on:click="stats">Stats</button>
  
  
                <br><br>
              </div>
        </div>
        </div>
      </div>`
  }
  
  const wastetype = {
    data: function(){
      return{
        drywatse:false,
        nopremium:false,
        plastic:false,
        cardboard:false,
        polybags:false,
        alltheabove:false,
        radio:"",
      }
    },
    methods:{
      proceed: async function(){
        if(this.radio=="Yes"){
          this.$router.push('/payment')
        }
        else{
          if(this.alltheabove){
            this.$store.state.plastic=true;
            this.$store.state.cardboard=true;
            this.$store.state.polybags=true;
          }
          else{
            if(this.plastic){
              this.$store.state.plastic=true;
            }
            if(this.cardboard){
              this.$store.state.cardboard=true;
            }
            if(this.polybags){
              this.$store.state.polybags=true;
            }
          }
  
          url="/api/user/bookings/"+this.$store.state.username+"/"+this.$store.state.societyname+"/"+this.$store.state.key+"/"+this.$store.state.dry_wet+"/"+this.$store.state.plastic+"/"+this.$store.state.cardboard+"/"+this.$store.state.polybags
          a= await fetch(url);
          response=await a.json();
          console.log(response)
          if(response=="Already Booked"){
            this.$router.push('/userpage/alreadybooked')
          }
          else{
            this.$router.push('/userpage/booked')
          }
        }
      }
    },
    beforeMount: function(){
      if(this.$store.state.dry_wet==1 || this.$store.state.dry_wet==3){
        this.drywatse=true;
      }
      if((!(this.$store.state.premium)) && (this.$store.state.dry_wet==2 || this.$store.state.dry_wet==3)){
        this.nopremium=true;
      }
    },
    template:`<div class="container-sm" style="text-align:left;"> 
                <br><br><br>
                <div class="row">
                  <div class="col border-end" v-show="drywatse">
                  <h4>Select the type of dry waste you are disposing</h4><br>
                    <div style="text-align:left;">
                    <input class="form-check-input me-1" type="checkbox" value="" aria-label="..." v-model="plastic">
                    Plastic
                    <br><br>
                    <input class="form-check-input me-1" type="checkbox" value="" aria-label="..." v-model="cardboard">
                    Cardboard 
                    <br><br>
                    <input class="form-check-input me-1" type="checkbox" value="" aria-label="..." v-model="polybags">
                    Polybags
                    <br><br>
                    <input class="form-check-input me-1" type="checkbox" value="" aria-label="..." v-model="alltheabove">
                    All the above  
                    <br><br>
                    </div>
                  </div>
                  <div class="col" style="text-align:left;" v-show="nopremium">
                  <h4>Do you want to subscribe for a compost bin for your wet waste?</h4><br>
                    <div style="text-align:left;">
                        <div class="form-check">
                          <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value="Yes" v-model="radio">
                          <label class="form-check-label" for="flexRadioDefault1">
                            Yes
                          </label>
                        </div>
                        <div class="form-check">
                          <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value="No" v-model="radio">
                          <label class="form-check-label" for="flexRadioDefault2">
                            No
                          </label>
                        </div>
                        <br><br>
                    </div>
                    
                  </div>
                </div><br>
                <div style="text-align:center;">
                Confirm and place Booking<br>
                <button type="button" class="btn btn-primary" v-on:click="proceed">Proceed</button>
                </div>
              </div>`
  }
  
  const payment ={
    data: function(){
      return{
  
      }
    },
    methods:{
      proceed: async function(){
        url="/api/user/bookings/"+this.$store.state.username+"/"+this.$store.state.societyname+"/"+this.$store.state.key+"/"+this.$store.state.dry_wet+"/"+this.$store.state.plastic+"/"+this.$store.state.cardboard+"/"+this.$store.state.polybags
        a= await fetch(url);
        response=await a.json();
        console.log(response=="Already Booked")
        if(response=="Already Booked"){
          this.$router.push('/userpage/alreadybooked')
        }
        else{
          this.$router.push('/userpage/booked')
        }
      }
    },
    template:`<div class="container-sm"><br><br><h3>This is the Payments Page</h3>
                <button type="button" class="btn btn-primary" v-on:click="proceed">Continue</button></div>`
  }
  
  const booked ={
    data: function(){
      return{
  
      }
    },
    methods:{
  
    },
    template:`<div><br>
              <h3> We will pick your waste within 4 hrs from now</h3><br><br>
              <br><br></div>`
  }
  
  const alreadybooked ={
    data: function(){
      return{
  
      }
    },
    methods:{
  
    },
    template:`<div><br>
              <h3> Already Booked. We are Processing on your Pickup</h3><br><br>
              <br><br></div>`
  }
  
  const stats = {
    data: function(){
      return{
  
      }
    },
    methods:{
  
    },
    template:`<div>STATS</div>`
  }
  
  const pickup = {
    data: function(){
      return{
        pickupname:this.$route.params.username,
        pickupsociety:this.$route.params.societyname,
        tow:this.$route.params.typeofwaste,
        remarks:"",
      }
    },
    methods:{
      com: async function(){
        url="/api/addbookingstatus/"+this.$store.state.username+"/"+this.$store.state.key+"/"+this.pickupname+"/"+this.pickupsociety+"/"+"No Concerns";
        a= await fetch(url);
        response=await a.json();
        if(response=="DONE"){
          this.$router.push('/employeepage')
        }
        else{
          alert("Error Occured")
          this.$router.push('/employeepage')
        }
      },
      rcom: async function(){
        url="/api/addbookingstatus/"+this.$store.state.username+"/"+this.$store.state.key+"/"+this.pickupname+"/"+this.pickupsociety+"/"+this.remarks;
        a= await fetch(url);
        response=await a.json();
        if(response=="DONE"){
          this.$router.push('/employeepage')
        }
        else{
          alert("Error Occured")
          this.$router.push('/employeepage')
        }
      },
    },
    template:`<div>
              <h2>Pick Up Details</h2><br>
              <div class="container-sm border rounded" style="padding: 2%;">
              Username: {{this.pickupname}}<br>
              Address: {{this.pickupsociety}}
              </div>
              <div class="container-sm border rounded" style="padding: 2%;">
                    <div v-if="tow == '1'">Excepted Waste Type: Dry Waste</div>
                    <div v-if="tow == '2'">Excepted Waste Type: Wet Waste</div>
                    <div v-if="tow == '3'">Excepted Waste Type: Dry and Wet Waste</div><br>
                    <textarea v-model="remarks"></textarea><br>
                    <button type="button" class="btn btn-primary" v-on:click="com">Complete</button>
                    <button type="button" class="btn btn-primary" v-on:click="rcom">Raise a concern & Complete</button>
            </div></div>`
  }
  
  const routes = [
  {path :'/', name: 'home', component: homepage},
  {path :'/contactus', name: 'contactus', component: contactus},
  {path :'/testimonials', name: 'testimonials', component: testimonials},
  {path :'/login', name: 'login', component: login},
  {path :'/adminpage', name: 'adminpage', component: adminpage},
  {path :'/employeepage', name: 'employeepage', component: employeepage},
  {path :'/userpage', name: 'userpage', component: userpage},
  {path :'/userpage/wastetype', name: 'wastetype', component: wastetype},
  {path :'/payment', name: 'payment', component: payment},
  {path :'/userpage/booked', name: 'booked', component: booked},
  {path :'/userpage/alreadybooked', name: 'alreadybooked', component: alreadybooked},
  {path :'/userpage/stats', name: 'stats', component: stats},
  {path :'/pickuppage/:username/:societyname/:typeofwaste', name: 'pickuppage', component: pickup}
  ]
  
  const router = new VueRouter({
    routes:routes,
    base: '/',
  })
  
  let app = new Vue({
      el: '#app',
      data: {
      },
      router:router,
      store:store,
      methods:{
        login: function(){
          this.$router.push('/login')
        },
        logout: function(){
          this.$store.state.loggedIn=false;
          this.$router.push('/');
        },
        book: async function(){
          if(this.$store.state.loggedIn){
            url="/api/checkbookingstatus/"+this.$store.state.username+"/"+this.$store.state.societyname+"/"+this.$store.state.key;
            a= await fetch(url);
            response=await a.json();
            if(response=="ALREADY BOOKED"){
              this.$router.push('/userpage/alreadybooked')
            }
            else{
              this.$router.push('/userpage');
            }
          }
          if(this.$store.state.loggedIn===false){
            this.$router.push('/login');
          }
        }
      },
    })