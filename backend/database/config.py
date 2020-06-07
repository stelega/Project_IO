import datetime

database_url = 'postgresql://qxbvllvcvqymqm:f4691671a6044da4462dd817ae4ad5b9681686b7ae36cd119d7150efc44c58bb@ec2-54-247-103-43.eu-west-1.compute.amazonaws.com:5432/d85bk4b0thbo18'
test_database_url = 'postgresql://czaeuokzglyzln:880d7992aa9a8ab5956c9dd3162c76111836e738fb97785ce4c35c768608d12e@ec2-54-247-78-30.eu-west-1.compute.amazonaws.com:5432/d4celc1mk7v4bj'
origins = ["https://kino2020-ui.herokuapp.com", "http://localhost:3000"]

open_time = datetime.time(10, 0, 0)
close_time = datetime.time(23, 0, 0)
cleaning_minutes = 10
possible_seance_interval = 300
ticket_price = 14.9
discount = 0.2
