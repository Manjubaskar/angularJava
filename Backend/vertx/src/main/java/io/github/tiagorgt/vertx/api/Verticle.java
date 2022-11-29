package io.github.tiagorgt.vertx.api;

import java.util.HashSet;
import java.util.Set;

import io.github.tiagorgt.vertx.api.entity.Contact;
import io.github.tiagorgt.vertx.api.entity.Position;
import io.github.tiagorgt.vertx.api.service.ContactService;
import io.github.tiagorgt.vertx.api.service.PositionService;
import io.vertx.core.AbstractVerticle;
import io.vertx.core.Future;
import io.vertx.core.http.HttpMethod;
import io.vertx.core.http.HttpServerResponse;
import io.vertx.core.json.Json;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.RoutingContext;
import io.vertx.ext.web.handler.BodyHandler;
import io.vertx.ext.web.handler.CorsHandler;

public class Verticle extends AbstractVerticle {

    private static final String offset = null;

	@Override
    public void start(Future<Void> fut) {
        Router router = Router.router(vertx); // <1>
        // CORS support
        Set<String> allowHeaders = new HashSet<>();
        allowHeaders.add("x-requested-with");
        allowHeaders.add("Access-Control-Allow-Origin");
        allowHeaders.add("origin");
        allowHeaders.add("Content-Type");
        allowHeaders.add("accept");
        Set<HttpMethod> allowMethods = new HashSet<>();
        allowMethods.add(HttpMethod.GET);
        allowMethods.add(HttpMethod.POST);
        allowMethods.add(HttpMethod.DELETE);
        allowMethods.add(HttpMethod.PUT);

        router.route().handler(CorsHandler.create("*") // <2>
                .allowedHeaders(allowHeaders)
                .allowedMethods(allowMethods));
        router.route().handler(BodyHandler.create()); // <3>

        // routes
   
        router.get("/contacts").handler(this::getEmployees);
        router.post("/contacts/create").handler(this::saved);
        router.put("/contacts/:id/update").handler(this::updated);
        router.delete("/contacts/:id/delete").handler(this::removed);
        router.get("/report").handler(this::getReport);
        
        
        router.get("/positions").handler(this::getPositions);
        router.post("/positions/create").handler(this::savePosition);
        router.put("/positions/:position_id/update").handler(this::updatePosition);
        router.delete("/positions/:position_id/delete").handler(this::removePosition);
        
        vertx.createHttpServer() // <4>
                .requestHandler(router::accept)
                .listen(8080, "0.0.0.0", result -> {
                    if (result.succeeded())
                        fut.complete();
                    else
                        fut.fail(result.cause());
                });
    }


    PositionService positionService = new PositionService();
    ContactService contactService = new ContactService();

    private void getEmployees(RoutingContext context) {
        contactService.list(context.request().getParam("limit"),context.request().getParam("offset"),ar -> {
            if (ar.succeeded()) {
                sendSuccess(Json.encodePrettily(ar.result()), context.response());
            } else {
                sendError(ar.cause().getMessage(), context.response());
            }
        });
    }
   
    private void getReport(RoutingContext context) {
        contactService.report(context.request().getParam("start_date"),context.request().getParam("end_date"),ar -> {
            if (ar.succeeded()) {
                sendSuccess(Json.encodePrettily(ar.result()), context.response());
            } else {
                sendError(ar.cause().getMessage(), context.response());
            }
        });
    }
    
    private void saved(RoutingContext context) {
        contactService.save(Json.decodeValue(context.getBodyAsString(), Contact.class), ar -> {
            if (ar.succeeded()) {
                sendSuccess(context.response());
            } else {
                sendError(ar.cause().getMessage(), context.response());
            }
        });
    }
    
    private void updated(RoutingContext context) {
        contactService.update(context.request().getParam("id"),Json.decodeValue(context.getBodyAsString(), Contact.class), ar -> {
            if (ar.succeeded()) {
                sendSuccess(context.response());
            } else {
                sendError(ar.cause().getMessage(), context.response());
            }
        });
    }
    
    private void removed(RoutingContext context) {
        contactService.remove(context.request().getParam("id"), ar -> {
            if (ar.succeeded()) {
                sendSuccess(context.response());
            } else {
                sendError(ar.cause().getMessage(), context.response());
            }
        });
    }
    
    private void getPositions(RoutingContext context) {
        positionService.list(ar -> {
            if (ar.succeeded()) {
                sendSuccess(Json.encodePrettily(ar.result()), context.response());
            } else {
                sendError(ar.cause().getMessage(), context.response());
            }
        });
    }

    private void savePosition(RoutingContext context) {
    	positionService.savePosition(Json.decodeValue(context.getBodyAsString(), Position.class), ar -> {
            if (ar.succeeded()) {
                sendSuccess(context.response());
            } else {
                sendError(ar.cause().getMessage(), context.response());
            }
        });
    }
    
    private void updatePosition(RoutingContext context) {
    	positionService.updatePosition(context.request().getParam("position_id"),Json.decodeValue(context.getBodyAsString(), Position.class), ar -> {
            if (ar.succeeded()) {
                sendSuccess(context.response());
            } else {
                sendError(ar.cause().getMessage(), context.response());
            }
        });
    }
    
    private void removePosition(RoutingContext context) {
    	positionService.removePosition(context.request().getParam("position_id"), ar -> {
            if (ar.succeeded()) {
                sendSuccess(context.response());
            } else {
                sendError(ar.cause().getMessage(), context.response());
            }
        });
    }
    private void sendError(String errorMessage, HttpServerResponse response) {
        JsonObject jo = new JsonObject();
        jo.put("errorMessage", errorMessage);

        response
                .setStatusCode(500)
                .putHeader("content-type", "application/json; charset=utf-8")
                .end(Json.encodePrettily(jo));
    }

    private void sendSuccess(HttpServerResponse response) {
        response
                .setStatusCode(200)
                .putHeader("content-type", "application/json; charset=utf-8")
                .end();
    }

    private void sendSuccess(String responseBody, HttpServerResponse response) {
        response
                .setStatusCode(200)
                .putHeader("content-type", "application/json; charset=utf-8")
                .end(responseBody);
    }
}
