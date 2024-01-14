# Docs

Api routes, methods, request and response below.

## List User

Return a list of all users.

* Url: /
* Method: GET
* StatusCode: 200
* Sucessful response:

```JSON
[
    {
        username: "username",
        email: "email@email.com"
    },
    ...
]
```

## One User

Return a specific user.

* Url: /user/:username
* Method: GET
* StatusCode: 200
* Sucessful response:

```JSON
{
    username: "username",
    email: "email@email.com"
}
```
