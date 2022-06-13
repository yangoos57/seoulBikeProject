from django.db import models

class WiseSaying(models.Model):
    text = models.TextField()

    def __str__(self):
        return self.text

# station 생 정보
class stationInformation(models.Model) : 
    st_id = models.IntegerField(db_index=True)
    st_name = models.CharField(max_length=40)
    district = models.CharField(max_length=10)
    latitude  = models.FloatField()
    longtitude  = models.FloatField()

# station selector에 들어갈 정보
# { value: 207, label: "207 여의도" }

class selector_Options(models.Model) : 
    value = models.IntegerField()
    label = models.CharField(max_length=40)


class seoul_bike_2021(models.Model) :
    date = models.DateField()         
    weekday = models.IntegerField()      
    by_id = models.IntegerField()        
    st_id1 = models.IntegerField(db_index=True)       
    st_id2 = models.IntegerField(db_index=True)       
    riding_time = models.IntegerField()  
    dist = models.FloatField()         
    m_pm = models.FloatField() 

class station_near_subway(models.Model) : 
    bi_st_id = models.IntegerField()
    sub_st_id = models.IntegerField(null=True)
    sub_name = models.CharField(max_length=20,null=True) 
    sub_line = models.CharField(max_length=10,null=True) 
    sub_long = models.FloatField(null=True)         
    sub_lat = models.FloatField(null=True)         
