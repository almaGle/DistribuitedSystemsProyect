import os
from spyne import Application, rpc, ServiceBase, Unicode, Integer, Iterable
from spyne.protocol.soap import Soap11
from spyne.server.wsgi import WsgiApplication
from app.db import get_db_connection
from app.rest_client import fetch_employees
from app.db_connection import get_db_connection

class TaskService(ServiceBase):
    
    @rpc(Unicode, Unicode, Integer, _returns=Unicode)
    def create_task(ctx, title, description, assigned_to):
        print(f"Received task: Title={title}, Description={description}, AssignedTo={assigned_to}")
        # Conexión a la base de datos
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO tasks (title, description, assigned_to) VALUES (%s, %s, %s) RETURNING id;",
            (title, description, assigned_to),
        )
        task_id = cursor.fetchone()[0]
        conn.commit()
        cursor.close()
        conn.close()
        return f"Task {task_id} created successfully."

    @rpc(_returns=Iterable(Unicode))
    def list_tasks(ctx):
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT id, title, description, assigned_to FROM tasks;")
        tasks = cursor.fetchall()
        cursor.close()
        conn.close()
        return [f"{task}" for task in tasks]

app = Application(
    [TaskService],
    tns="soap.api",
    in_protocol=Soap11(validator="lxml"),
    out_protocol=Soap11(),
)
soap_app = WsgiApplication(app)
