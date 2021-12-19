# NgRx

## What is NgRx?

Is a reactive library for Angular that is composed of several modules for managing application state, with Redux inspiration.

## What is Reactive?

By Wikipedia:

- In computing, reactive programming is a declarative programming paradigm concerned with data strams and the propagation of change.

## Modules

NgRx is composed of several modules:

- @ngrx/store
- @ngrx/effects
- @ngrx/router-store
- @ngrx/store-devtools
- @ngrx/entity
- @ngrx/schematics

## What does NgRx solve?

Client applications can be complex. Whether deployed within the context of a browser or a mobile device client applications built with Angular often start simple and grow in complexity in order to deliver the desired functionality with a pratical and valuable user experience.

### The problem

The problem is not inherently the complexity of client applications, but the result of the complexity:

- Is the navigation open or closed?
- Do we show or hide a loading indicator?
- Is a form valid or not?
- What filters were used in a search?
- Is the user logged in?
- Etc.

Keeping track of the state of our application can be difficult

### Singletons

One approach to keeping track of all of this "state" is to store the information in a singleton:

> src/app/search.service.ts

```ts
@Injectable({
  providedIn: "root",
})
export class SearchService {
  filters: Filter[];
  query: string;

  search(): SearchResult {
    // returns the result of the search using the user query and filters
  }
}
```

> src/app/app.component.ts

```ts
@Component({
  template: `
    <app-search
      [filters]="filters"
      [query]="query"
      (search)="onSearch($event)"
    ></app-search>
  `,
})
export class AppComponent {
  constructor(private searchService: SearchService) {}

  onSearch(data: SearchData) {
    // store filters and query
    this.searchService.filters = data.filters;
    this.searchService.query = data.query;

    // perform search
    const result = this.searchService.search();
  }
}
```

In the `AppComponent` we use the `SeachService` to store both the currently selected filters and the user's search query and to perform the search.

### Keeping it in sync

Keeping the various state in our applications becomes difficult to manage via singletons or services:

- Persistance
- Local Storage
- Routing
- Form Data
- UI State
- Pagination

### Immutability

- Massive perframnce gain via `ChangeDetectionStrategy.OnPush`
- Guaranteed accuracy
- Must be enforced

## Why use NgRx?

1. Do not use NgRx until necessary
2. Do use NgRx when state management is difficult

### When **not** to use NgRx

- Simple applications
- Litte to no component intercommunication
- Synchronizing state
- All is well

### When to use NgRx

- Lots of intercommunication
- Slice of data is used in multiple components or services
- Data is mutated in multiple components or services
- Poor performance
- All is not well

## Three principles of redux

> NgRx is inspired by Redux - but it's not Redux.

Redux has 3 core principles:

1. Single source of truth
2. State is read only
3. Changes are made with pure functions

### Single source of truth

- State is stored in the store
- The store is an object tree

### State is read only

- Immutable
- Dispatch actions describing state change

### Changes are made with pure functions

Pure functions must:

1. Return value is only dependent on input values
2. No side effects

## NgRx architecture

![](./ngrx-architecture.png)

- Components dispatch actions describing the state change
- Reducers are pure functions that return the new state
- Selectors access slices of state
- Optional effects perform side effects

## Actions

- An object that specifies the `type` of action being dispatched
- Optionally contains ata or a payload

### Action interface

While we can create simple object actions, using TypeScript we can create classes that implement the Actions interface.

```ts

export enum UserActionTypes {
  AddUser: '[User] Add user',
  AddUserFail: '[User] Add user fail',
  AddUserSuccess: '[User] Add user success'
}

export class AddUserAction implements Action {
  type: UserActionTypes.AddUser;

  constructor(public user: Partial<User>) { }
}

export class AddUserFailAction implements Action {
  type: UserActionTypes.AddUserFail;

  constructor(public error: Error) { }
}

export class AddUserSuccess implements Action {
  type: UserActionTypes.AddUserSuccess;

  constructor(public user: User) { }
}
```

## Reducers

- Pure functions
- Accept the current state and the action to be performed
- We can default the current state to an initial state

### Example reducer

```ts

export const userReducer(state = initialState, action: Action): State {
  switch (action.type) {
    case UserActions.AddUserSuccess {
      return {
        ...state,
        users: [
          ...state.users,
          action.user
        ]
      }
    }
    default:
      return state
  }
};
```

- We default the `state` argument to some `initialState`
- Reducer return type is `State`
- We do not mutate the state object
- Use spread operator to create shallow clone

## Store

- `dispath()` actions
- An `Observable` of state
- An `Observer` of actions

### Dispatching actions

```ts
export class AddUserComponent {
  constructor(private store: Store<AppState>) {}

  onSubmit(user: User) {
    this.store.dispatch(new AddUserAction(user));
  }
}
```

- Inject `Store`
- Invoke `dispatch()` method
- New up the `AddUserAction` class specifying the `User`
- No HTTP service
- No state changes

### Observing State

```ts
export class UserListComponent implements OnInit {
  users: Observable<Array<User>>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.users = this.store.pipe(select(allUsers));
  }
}
```

- `users` is an `Observable` that receive notifications
- The notification type is an array of `User` objects
- Inject `Store`
- Invoke the `pipe()` method on the `store`
- Use the `select()` operator specifying the `allUsers` selector

### What's a selector?

> Kind of like a stored procedure

- Pure function
- Enables us to obtain a specific slice of data in the state tree
- Memoized for performance

### What is memoization?

> An optimization technique to cache expensive functions calls

- Tracks arguments
- Stores output
- Previous result is returned when argument match

## Effects

- Perform side effects, often asynchronous
- Listen for actions
- Optionally dispatch one or more actions
- Reactive

```ts
@Injectable()
export class UserEffects {
  @Effect()
  add: Observable<Action> = this.actions$.pipe(
    ofType < AddUserAction > UserActionTypes.AddUser,
    exhaustMap((action) =>
      this.service.save(action.user).pipe(
        map((user) => new AddUserSuccess(user)),
        catchError((error) => of(new AddUserFail(error)))
      )
    )
  );
}
```

- The `@Effect` decorator annotates properties in the class that listen for actions
- Filter for the desired actions using the `ofType()` method
- Invoke the `pipe()` method with operators to execute when the action of the specified type is dispatched
- We use the `exhaustMap()` operator to switch streams to the `Observable` that is returned from our service `save()` method, which we `map()` to a new `AddUserSuccess` action or the `AddUserFail` action when an error occurs.
