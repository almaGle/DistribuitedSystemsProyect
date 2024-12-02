from spyne import Application, rpc, ServiceBase, Integer, Unicode, Iterable
from spyne.protocol.soap import Soap11
from spyne.server.wsgi import WsgiApplication
from wsgiref.simple_server import make_server


class TaskService(ServiceBase):
    @rpc(Unicode, Unicode, Integer, _returns=Unicode)
    def example_method(ctx, param1, param2, param3):
        return f"Received: {param1}, {param2}, {param3}"
    
    @rpc(_returns=Iterable(Unicode))
    def list_tasks(ctx):
        return ["Task 1", "Task 2"]

app = Application(
    [TaskService],
    tns="soap.api",
    in_protocol=Soap11(validator="lxml"),
    out_protocol=Soap11(),
)

soap_app = WsgiApplication(app)

if __name__ == "__main__":
    print("SOAP API running on http://0.0.0.0:5000")
    server = make_server("0.0.0.0", 5000, soap_app)
    server.serve_forever()
