web-up:
	docker-compose up --detach --build web

web-exec:
	docker-compose exec web /bin/bash
