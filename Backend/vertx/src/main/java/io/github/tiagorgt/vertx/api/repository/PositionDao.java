package io.github.tiagorgt.vertx.api.repository;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.Query;

import io.github.tiagorgt.vertx.api.entity.Contact;
import io.github.tiagorgt.vertx.api.entity.Position;

/**
 * Created by tiago on 07/10/2017.
 */
public class PositionDao {
    private static PositionDao instance;
    protected EntityManager entityManager;

    public static PositionDao getInstance(){
        if (instance == null){
            instance = new PositionDao();
        }

        return instance;
    }

    private PositionDao() {
        entityManager = getEntityManager();
    }

    private EntityManager getEntityManager() {
        EntityManagerFactory factory = Persistence.createEntityManagerFactory("crudHibernatePU");
        if (entityManager == null) {
            entityManager = factory.createEntityManager();
        }

        return entityManager;
    }

    public Position getById(final int position_id) {
        return entityManager.find(Position.class, position_id);
    }

    @SuppressWarnings("unchecked")
    public List<Position> findAll() {
        return entityManager.createQuery("FROM " + Position.class.getName()).getResultList();
    }
    
    public void persist(Position position) {
        try {
            entityManager.getTransaction().begin();
            entityManager.persist(position);
            entityManager.getTransaction().commit();
        } catch (Exception ex) {
            ex.printStackTrace();
            entityManager.getTransaction().rollback();
        }
    } 
    
    public void removeById(String position_id) {
        try {
        	entityManager.getTransaction().begin();
        	Query query= entityManager.createQuery("DELETE FROM Position WHERE position_id = '"+position_id+"'");
        	query.executeUpdate();
    		entityManager.getTransaction().commit();
    		 		 
	  }  catch (Exception ex) {
	            ex.printStackTrace();
	            entityManager.getTransaction().rollback();      
    }
        
    }
  
    public void mergeById(String position_id, String position_name) {
        try {
        	
        	entityManager.getTransaction().begin();
            Query contact = entityManager.createQuery("UPDATE Position set position_name='"+position_name+"'"
            		+ "WHERE id='"+position_id+"'");
            contact.executeUpdate();
    		entityManager.getTransaction().commit();
    		 		 
	  }  catch (Exception ex) {
	            ex.printStackTrace();
	            entityManager.getTransaction().rollback();      
    }
        }

}
