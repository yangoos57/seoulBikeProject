from rest_framework import serializers
from .models import *


class departure_infoSerializer(serializers.ModelSerializer):
    class Meta:
        model = departure_info
        fields = "__all__"
