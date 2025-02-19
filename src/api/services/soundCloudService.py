import requests
import json
import os
from dotenv import load_dotenv

# Cargar variables de entorno desde el archivo .env
load_dotenv()

class SoundCloudService:
    def __init__(self):
        self.client_id = os.getenv("SOUNDCLOUD_CLIENT_ID")
        self.client_secret = os.getenv("SOUNDCLOUD_CLIENT_SECRET")
        self.access_token = self.get_access_token()

    def get_access_token(self):
        response = requests.post(
            "https://api.soundcloud.com/oauth2/token",
            data={
                "grant_type": "client_credentials",
                "client_id": self.client_id,
                "client_secret": self.client_secret,
            },
        )
        response_data = response.json()
        if "access_token" not in response_data:
            raise Exception(f"Error obteniendo el token: {response_data}")
        return response_data["access_token"]

    def get_tracks_by_genre(self, genre):
        response = requests.get(
            f"https://api.soundcloud.com/tracks?genres={genre}&limit=10&client_id={self.client_id}"
        )
        if response.status_code != 200:
            raise Exception(f"Error obteniendo tracks: {response.json()}")
        return response.json()

    def get_stream_url(self, track_id):
        response = requests.get(
            f"https://api.soundcloud.com/tracks/{track_id}?client_id={self.client_id}"
        )
        track_data = response.json()
        if "stream_url" not in track_data:
            raise Exception(f"Error obteniendo URL de streaming: {track_data}")
        return track_data["stream_url"], track_data

    def create_playlist(self, title, track_ids, sharing="public"):
        if not track_ids:
            raise ValueError("La lista de pistas está vacía")
        
        data = {
            "playlist": {
                "title": title,
                "tracks": [{"id": track_id} for track_id in track_ids],
                "sharing": sharing
            }
        }
        response = requests.post(
            "https://api.soundcloud.com/playlists",
            headers={
                "Authorization": f"OAuth {self.access_token}",
                "Content-Type": "application/json"
            },
            data=json.dumps(data)
        )
        if response.status_code != 201:
            raise Exception(f"Error creando playlist: {response.json()}")
        return response.json()
