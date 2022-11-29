package io.github.tiagorgt.vertx.api.service;

import java.util.List;

import io.github.tiagorgt.vertx.api.entity.Position;
import io.github.tiagorgt.vertx.api.repository.PositionDao;
import io.vertx.core.AsyncResult;
import io.vertx.core.Future;
import io.vertx.core.Handler;

public class PositionService {
    private PositionDao positionDao = PositionDao.getInstance();

    public void list(Handler<AsyncResult<List<Position>>> handler){
        Future<List<Position>> future = Future.future();
        future.setHandler(handler);

        try {
            List<Position> result = positionDao.findAll();
            future.complete(result);
        } catch (Throwable ex) {
            future.fail(ex);
        }
    }
    
	public void savePosition(Position position, Handler<AsyncResult<Position>> handler) {
        Future<Position> future = Future.future();
        future.setHandler(handler);
        

        try {
        	positionDao.persist(position);
            future.complete();
        } catch (Throwable ex) {
            future.fail(ex);
            
        }
    }

	public void updatePosition(String position_id,Position position, Handler<AsyncResult<Position>> handler) {
        Future<Position> future = Future.future();
        future.setHandler(handler);

        try {
        	positionDao.mergeById(position_id,position.getPosition_name());
            future.complete();
        } catch (Throwable ex) {
            future.fail(ex);
        }
    }

	public void removePosition(String position_id,Handler<AsyncResult<Position>> handler) {
        Future<Position> future = Future.future();
        future.setHandler(handler);

        try {
        	positionDao.removeById(position_id);
            future.complete();
        } catch (Throwable ex) {
            future.fail(ex);
        }
    }

}
