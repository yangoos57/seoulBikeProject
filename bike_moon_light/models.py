from django.db import models


class departure_info(models.Model):
    value = models.IntegerField(db_index=True)
    label = models.CharField(max_length=40)


class arrival_info(models.Model):
    value = models.IntegerField()
    label = models.CharField(max_length=40)
