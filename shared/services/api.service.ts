import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListWCursor } from 'shared/interfaces';


export abstract class ApiService<T>  {

  token = localStorage.getItem("token_shop_app") || ''
  options = {
    headers: {
      "Authorization": "Bearer " + this.token
    }
  }

  private readonly api: string = 'http://127.0.0.1:8000/api';
  constructor(protected http: HttpClient) {
  }

  /**
   * This is the base of the api url, for example: in the url: `http://myserver.com/api/<users>`
   * - `users`: is the root
   *
   * When implementing this class, you should return the root as mentioned above.
   *
   * **Example:**
   *
   * ```ts
   * class UserService extends ApiService<User> {
   *
   *  constructor(http: HttpClient) {
   *    super(http);
   *  }
   *
   *   public root(): string {
   *     return 'users';
   *   }
   * }
   * ```
   */
  public abstract root(): string;

  /**
   * This getter takes the default `api` const string (on top of this class) and the
   * `root()` to create the api uri to make requests.
   * @internal
   */
  protected get uri(): string {
    return `${this.api}/${this.root()}`;
  }

  /**
   * Calls the default `GET http://myserver.com/api/<root>` to list all the entities,
   * also depending on the filter params provided.
   * @param {FilterParams} params The optional filter params to be sent in the request
   * @return {Observable} an `Observable` of a `ListWCursor<T>` inside, containing the entities and a cursor for pagination
   */
  public list(): Observable<ListWCursor<T>> {

    return this.http.get<ListWCursor<T>>(`${this.uri}`, this.options);
  }

  // public search(shortName: string): Observable<ListWCursor<T>> {
  //   return this.http.get<ListWCursor<T>>(`${this.uri}/search/${shortName}`);
  // }

  /**
   * Calls the default `POST http://myserver.com/api/<root>` to save a new entity of
   * type `<T>`
   * @param e The entity to be saved as new
   * @return an `Observable` of the saved entity of type `<T>`
   */
  public store(e: T): Observable<T> {
    return this.http.post<T>(this.uri, e, this.options);
  }



  /**
   * Calls the default `GET http://myserver.com/api/<root>/{id}` to retrieve a single entity of
   * type `<T>` with the corresponding `id`
   * @param id The `id` of the entity to search for
   * @return an `Observable` of the found entity of type `<T>`
   */
  public single(id: number, relations: boolean = true): Observable<T> {
    return this.http.get<T>(`${this.uri}/${id}${!relations ? `?rel=${relations}` : ''}`, this.options);
  }

  /**
   * Calls the default `PUT http://myserver.com/api/<root>/{id}` to save an existing entity of
   * type `<T>` (updating it).
   * @param id The current `id` of the entity to be updated
   * @param e The entity with the updated fields
   * @return an `Observable` of the updated entity of type `<T>`
   */
  public update(id: number, e: T): Observable<T> {
    return this.http.put<T>(`${this.uri}/${id}`, e, this.options);
  }
  /**
   * Calls the default `DELETE http://myserver.com/api/<root>/{id}` to delete an existing entity of
   * type `<T>` with the corresponding `id`
   * @param id The current `id` of the entity to be deleted
   * @return an `Observable` of the saved entity of type `<T>`
   */
  public destroy(id: number): Observable<T> {
    return this.http.delete<T>(`${this.uri}/${id}`, this.options);
  }
}




