
- if you want to run both `frontend` and `backend` apps in containers then run `docker-compose --profile full-stack up -d`

---

- if you want to run just the `backend` app in the container then run `docker-compose up -d`
- to serve `frontend` app, change directory to `./frontend`, run `npm i`, and then run `npm run start`

---

- access the frontend app on `localhost:4200`
- access the backend on `localhost:4000`
- access the swagger on `localhost:4000/api-docs`

---

- rented cars are updating their current address every 5 seconds