import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap, map, switchMap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Content } from './helper-files/content-interface';
import { MessagesService } from './messages.service';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private contentUrl = 'api/content'; // URL to web api
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-type': 'application/json' })
  };

  constructor(private http: HttpClient, private messagesService: MessagesService) {}

  getContentArray(): Observable<Content[]> {
    return this.http.get<Content[]>(this.contentUrl)
      .pipe(
        tap(_ => this.messagesService.addMessage('Content array loaded!')),
        catchError(this.handleError<Content[]>('getContentArray', []))
      );
  }

  getContentById(id: number): Observable<Content | undefined> {
    const url = `${this.contentUrl}/${id}`; // Syntax error corrected here
    return this.http.get<Content>(url)
      .pipe(
        tap(_ => this.messagesService.addMessage(`Content item at id: ${id}`)), // Syntax error corrected here
        catchError(this.handleError<Content>('getContentById'))
      );
  }

  addContent(content: Content): Observable<Content> {
    return this.http.get<Content[]>(this.contentUrl).pipe(
      map(contents => {
        const highestId = Math.max(...contents.map(item => item.id || 0)); // Handle null values
        const newId = highestId >= 0 ? highestId + 1 : 0; // If no content exists, start from 0
        content.id = newId;
        return content;
      }),
      tap(_ => this.messagesService.addMessage(`Generated new id for content: ${content.id}`)), // Syntax error corrected here
      switchMap((newContent: Content) => 
        this.http.post<Content>(this.contentUrl, newContent, this.httpOptions)
          .pipe(
            tap(_ => this.messagesService.addMessage(`Added new content with id ${newContent.id}`)), // Syntax error corrected here
            catchError(this.handleError<Content>('addContent'))
          )
      )
    );
  }

  updateContent(content: Content): Observable<Content> {
    const url = `${this.contentUrl}/${content.id}`; // Syntax error corrected here
    return this.http.put<Content>(url, content, this.httpOptions)
      .pipe(
        tap(_ => this.messagesService.addMessage(`Updated content with id ${content.id}`)), // Syntax error corrected here
        catchError(this.handleError<Content>('updateContent'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.messagesService.addMessage(`${operation} failed: ${error.message}`); // Syntax error corrected here
      return of(result as T);
    };
  }
}
