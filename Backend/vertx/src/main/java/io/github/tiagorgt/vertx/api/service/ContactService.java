package io.github.tiagorgt.vertx.api.service;

import java.util.List;

import io.github.tiagorgt.vertx.api.entity.Contact;
import io.github.tiagorgt.vertx.api.repository.ContactDao;
import io.vertx.core.AsyncResult;
import io.vertx.core.Future;
import io.vertx.core.Handler;

public class ContactService {
    private ContactDao contactDao = ContactDao.getInstance();

    public void list(String limit,String offset,Handler<AsyncResult<List<Contact>>> handler){
        Future<List<Contact>> future = Future.future();
        future.setHandler(handler);

        try {
        	System.out.print(limit);
        	System.out.print(offset);
        	
        	int limits = Integer.parseInt(limit);
        	int offsets = Integer.parseInt(offset);
            List<Contact> result = contactDao.findAll(limits,offsets);
            future.complete(result);
        } catch (Throwable ex) {
            future.fail(ex);
        }
    }
    
    
    public void report(String start_date,String end_date,Handler<AsyncResult<List<Contact>>> handler){
        Future<List<Contact>> future = Future.future();
        future.setHandler(handler);

        try {
        	System.out.print(start_date);
        	System.out.print(end_date);
        	
            List<Contact> result = contactDao.report(start_date,end_date);
            future.complete(result);
        } catch (Throwable ex) {
            future.fail(ex);
        }
    }
    public void save(Contact newContact, Handler<AsyncResult<Contact>> handler) {
        Future<Contact> future = Future.future();
        future.setHandler(handler);
        

        try {
        	contactDao.persist(newContact);
            future.complete();
        } catch (Throwable ex) {
            future.fail(ex);
            
        }
    }
    
    public void update(String id,Contact contact, Handler<AsyncResult<Contact>> handler) {
        Future<Contact> future = Future.future();
        future.setHandler(handler);

        try {
        	contactDao.mergeById(id,contact.getName(),contact.getAddress(),contact.getCity(),contact.getEmail(),contact.getPhone()
        			, contact.getTitle(),contact.getPosition().getPosition_id());
            future.complete();
        } catch (Throwable ex) {
            future.fail(ex);
        }
    }

    public void remove(String id, Handler<AsyncResult<Contact>> handler) {
        Future<Contact> future = Future.future();
        future.setHandler(handler);

        try {
        	contactDao.removeById(id);
            future.complete();
        } catch (Throwable ex) {
            future.fail(ex);
        }
    }
    
}
