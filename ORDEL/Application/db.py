from flask import current_app as app
from flask_sqlalchemy import SQLAlchemy

app.config['SQLALCHEMY_DATABASE_URI'] ="sqlite:///db.sqlite3"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db=SQLAlchemy()
db.init_app(app)


class user_login(db.Model):
	__tablename__='user_login'
	username=db.Column(db.String, primary_key=True, nullable=False, unique=True)
	password=db.Column(db.String, nullable=False)
	societyname=db.Column(db.String, primary_key=True)
	key=db.Column(db.String)
	user_type=db.Column(db.Integer)


class bookings(db.Model):
	__tablename__='bookings'
	username=db.Column(db.String, db.ForeignKey("user_login.username"))
	societyname=db.Column(db.String, db.ForeignKey("user_login.societyname"))
	dry_wet_both=db.Column(db.Integer)
	timestamp=db.Column(db.String)
	plastic=db.Column(db.String)
	cardboard=db.Column(db.String)
	polybags=db.Column(db.String)
	booking_id=db.Column(db.Integer, primary_key=True)
	status=db.Column(db.String)
	remarks=db.Column(db.String)

class user_data(db.Model):
	__tablename__='user_data'
	username=db.Column(db.String, db.ForeignKey("user_login.username"), primary_key=True)
	societyname=db.Column(db.String, db.ForeignKey("user_login.societyname"), primary_key=True)
	subscription=db.Column(db.Numeric)
	net_dry_waste=db.Column(db.Numeric)
	net_wet_waste=db.Column(db.Numeric)
	userlevel=db.Column(db.Integer)
	net_dry_plastic=db.Column(db.Numeric)
	net_dry_cardboard=db.Column(db.Numeric)
	net_exchange=db.Column(db.Numeric)
	net_ex_newspaper=db.Column(db.Numeric)
	net_ex_metal=db.Column(db.Numeric)
	net_ex_notebooks=db.Column(db.Numeric)
	net_ex_magazine=db.Column(db.Numeric)
	net_ex_ewaste=db.Column(db.Numeric)
	net_ex_plastic=db.Column(db.Numeric)
	house_owner=db.Column(db.String)
	current_occupant=db.Column(db.String)
	door_no=db.Column(db.String)
	phone_no=db.Column(db.String)
	alternate_phone_no=db.Column(db.String)
	email_id=db.Column(db.String)
