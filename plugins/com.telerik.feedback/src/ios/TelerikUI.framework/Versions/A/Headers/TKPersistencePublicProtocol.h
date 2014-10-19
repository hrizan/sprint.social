//
//  TKPersistencePublicProtocol.h
//  DataSyncDemo
//
//  Copyright (c) 2014 Telerik. All rights reserved.
//

#import <Foundation/Foundation.h>
@class TKResultInfo;
@class TKHistoryLogItem;

typedef void (^resHandler)(TKResultInfo* result, NSError* error);
typedef void (^numericResHandler)(NSNumber* result, NSError* error);
typedef void (^arrayResHandler)(NSArray* result, NSError* error);

/**
 TKPersistencePublicProtocol defines public interface for ORM features.
 */
@protocol TKPersistencePublicProtocol <NSObject>

/*!
 Inserts given object into context's in-memory storages
 @param  object The object to be inserted-
 */
-(void) insertObject:(id) object;

/*!
 Marks given object as updated in context's in-memory storages
 @param  object The object to be updated
 */
-(void) updateObject:(id) object;

/*!
 Marks the given object as deleted in context's in-memory storages
 @param  object The object to be deleted
 */
-(void) deleteObject:(id) object;

/*!
 Saves changes that are accumulated in the context to the local db
 @param  error NSError object returned in case of failure
 @result YES in case of successful operation, else NO
 */
-(BOOL) saveChanges:(NSError**) error;

/*!
 This methods performs an aggregate query with scalar result bundled in NSNumber.
 @param  scalarQuery The SQL query with scalar result:
 EX: Select Count(*) from TableName
 @param  error NSError object returned in case of failure
 @result The scalar result as NSNumber instance.
 */
-(NSNumber*) getScalarWithQuery:(NSString*) scalarQuery
                failedWithError:(NSError**) error;

/*!
 Get all entity objects persisted in database
 @param  type The Class of acquired entity class
 @param  error NSError object returned in case of failure
 @result An array with instances of entity class
 */
-(NSArray*) getAllObjectsOfType:(Class) type
                failedWithError:(NSError**) error;

/*!
 Executes the query mapping the given parameters.
 @param  sql SQL query to be executed
 @param  parameters Array with parameters to be mapped at corresponding position
 @param  objClass The class for resulted entity. The properties of the class should correspond to the returned result.
 @param  error NSError object returned in case of failure
 @result An array of objClass instances with result fetched from database.
 */
-(NSArray*) getObjectsWithQuery:(NSString*) sql
                 withParameters:(NSArray*) parameters
                     objectType:(Class) objClass
                failedWithError:(NSError**) error;


@optional
/*!
 Asynchronously saves to local database changes that are accumulated in context 
 @param queue The dispatch queue on which the handler should be executed.
 @param handler The handler method for result processing
 */
-(void) saveChangesAsync:(dispatch_queue_t) queue
       completionHandler:(resHandler) handler;

/*!
 Asunchronously retrives all objects of given type form database  
 @param type The entity class of interest
 @param queue The dispatch queue on which the handler should be executed.
 @param handler The handler method for processing of result returned as an array of values
 */
-(void) getAsyncAllObjectsOfType:(Class) type
                 completionQueue:(dispatch_queue_t) queue
               completionHandler:(arrayResHandler) handler;

/*!
 Asunchronously retrives all objects of given type form database
 @param sql An sql query formated in context of SQLite requirements for query
 @param parameters An array with parameter values that will be substituted to sql query
 @param objClass The entity class of interest
 @param queue The dispatch queue on which the handler should be executed.
 @param handler The handler method for processing of result returned as an array of values
 */
-(void) getAsyncObjectsWithQuery: (NSString*) sql
                  withParameters:(NSArray*) parameters
                      objectType:(Class) objClass
                 completionQueue:(dispatch_queue_t) queue
               completionHandler:(arrayResHandler) handler;

/*!
 Asunchronously retrives all objects of given type form database
 @param scalarQuery An sql scalar query formated in context of SQLite requirements for query
 @param queue The dispatch queue on which the handler should be executed.
 @param handler The handler method for processing of result returned as NSNumber
 */
-(void) getAsyncScalarWithQuery:(NSString*) scalarQuery
                completionQueue:(dispatch_queue_t) queue
              completionHandler:(numericResHandler) handler;

@end
