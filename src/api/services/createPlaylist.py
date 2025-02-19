import requests
import json
import os
from dotenv import load_dotenv

# Cargar variables de entorno desde el archivo .env
load_dotenv()

class CreatePlaylist:
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
        return response_data["access_token"]

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

if __name__ == "__main__":
    create_playlist_service = CreatePlaylist()

    # IDs de canciones correctos
    running_track_ids = [1129526146, 842491084, 2007319063, 1234077649, 1887433068]
    workout_track_ids = [1531099255, 2008020223, 1944843163, 1977341831, 1917351020]
    walking_track_ids = [674550932, 1529368726, 1542192028, 255770515, 917949826]
    relax_track_ids = [1814815851, 2004218455, 2029532816]

    # Crear listas de reproducción
    running_playlist = create_playlist_service.create_playlist("Running Playlist", running_track_ids)
    workout_playlist = create_playlist_service.create_playlist("Workout Playlist", workout_track_ids)
    walking_playlist = create_playlist_service.create_playlist("Walking Playlist", walking_track_ids)
    relax_playlist = create_playlist_service.create_playlist("Relax Playlist", relax_track_ids)

    # Guardar JSON
    if not os.path.exists("api/data"):
        os.makedirs("api/data")

    with open("api/data/running_playlist.json", 'w') as file:
        json.dump(running_playlist, file, indent=4)
    with open("api/data/workout_playlist.json", 'w') as file:
        json.dump(workout_playlist, file, indent=4)
    with open("api/data/walking_playlist.json", 'w') as file:
        json.dump(walking_playlist, file, indent=4)
    with open("api/data/relax_playlist.json", 'w') as file:
        json.dump(relax_playlist, file, indent=4)

    print("Listas de reproducción creadas y almacenadas en archivos JSON.")
