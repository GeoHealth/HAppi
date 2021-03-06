import { AuthRestService } from "../../../app/services/auth_rest_service";
import { CrashlyticsMock, HttpMock } from "../../mocks";
import { Http, Headers, RequestOptions } from "@angular/http";
import { Crashlytics } from "../../../app/services/crashlytics";
import { Observable } from "rxjs/Observable";

let check_response_data = function (context: any) {
  it('contains an id equal to 2', () => {
    expect(context.data.id).toEqual(2);
  });

  it('contains a provider equal to email', () => {
    expect(context.data.provider).toEqual("email");
  });

  it('contains an uid equal to "test@mail.com"', () => {
    expect(context.data.uid).toEqual("test@mail.com");
  });

  it('contains a name', () => {
    expect(context.data.name).not.toBeUndefined();
  });

  it('contains a nickname', () => {
    expect(context.data.nickname).not.toBeUndefined();
  });

  it('contains an image', () => {
    expect(context.data.image).not.toBeUndefined();
  });

  it('contains an email equal to "test@mail.com"', () => {
    expect(context.data.email).toEqual("test@mail.com");
  });

  it('contains an first_name equal to "Foo"', () => {
    expect(context.data.first_name).toEqual("Foo");
  });

  it('contains an first_name equal to "Bar"', () => {
    expect(context.data.last_name).toEqual("Bar");
  });

  it('contains an gender equal to "male"', () => {
    expect(context.data.gender).toEqual("male");
  });
};

describe('AuthRestService', () => {
  beforeAll(() => {
    this.auth_rest_service = new AuthRestService(new HttpMock() as Http, new CrashlyticsMock() as Crashlytics);
  });

  afterAll(() => {
    this.auth_rest_service = null;
  });

  describe('#auth', () => {
    describe('when the response is 200', () => {
      beforeEach(() => {
        spyOn(this.auth_rest_service.http, "post").and.returnValue(Observable.of({
          "status": 200,
          "_body": "{\"data\":{\"id\":2,\"provider\":\"email\",\"uid\":\"test@mail.com\",\"name\":null,\"nickname\":null,\"image\":null,\"email\":\"test@mail.com\",\"first_name\":\"Foo\",\"last_name\":\"Bar\",\"gender\":\"male\"}}"
        }));
      });

      it('performs a post to /auth/sign_in', () => {
        this.auth_rest_service.auth("email", "password");
        expect(this.auth_rest_service.http.post).toHaveBeenCalledWith(
          "http://test.com:80/auth/sign_in",
          {
            'email': "email",
            'password': "password"
          },
          this.auth_rest_service.getHeadersForJSON());
      });

      it('returns an Observable containing a key "_body" which is a JSON', (done) => {
        let response = this.auth_rest_service.auth("email", "password");
        response.subscribe((value: any) => {
          expect(value["_body"]).not.toBeUndefined();
          expect(value["_body"]).toEqual(jasmine.any(String));
          done();
        });
      });

      describe('the response', () => {
        beforeEach((done) => {
          this.auth_rest_service.auth("email", "password").subscribe((json: any) => {
            this.response = JSON.parse(json["_body"]);
            done();
          });
        });

        it('contains a "data" key', () => {
          expect(this.response.data).not.toBeUndefined();
        });

        describe('the data', () => {
          beforeEach(() => {
            this.data = this.response.data;
          });

          check_response_data(this);
        });
      });
    });
  });

  describe('#create', () => {
    describe('when the response is 200', () => {
      beforeEach(() => {
        spyOn(this.auth_rest_service.http, "post").and.returnValue(Observable.of({
          "status": 200,
          "_body": "{\"data\":{\"id\":2,\"provider\":\"email\",\"uid\":\"test@mail.com\",\"name\":null,\"nickname\":null,\"image\":null,\"email\":\"test@mail.com\",\"first_name\":\"Foo\",\"last_name\":\"Bar\",\"gender\":\"male\"}}"
        }));
      });

      it('performs a post to /auth', () => {
        this.auth_rest_service.create("email", "password", "password", "Foo", "Bar", "male");
        expect(this.auth_rest_service.http.post).toHaveBeenCalledWith(
          "http://test.com:80/auth",
          {
            'email': "email",
            'password': "password",
            'password_confirmation': "password",
            'first_name': "Foo",
            'last_name': "Bar",
            'gender': "male"
          },
          this.auth_rest_service.getHeadersForJSON());
      });

      it('returns an Observable containing a key "_body" which is a JSON', (done) => {
        let response = this.auth_rest_service.create("email", "password", "password", "Foo", "Bar", "male");
        response.subscribe((value: any) => {
          expect(value["_body"]).not.toBeUndefined();
          expect(value["_body"]).toEqual(jasmine.any(String));
          done();
        });
      });

      describe('the response', () => {
        beforeEach((done) => {
          this.auth_rest_service.create("email", "password", "password", "Foo", "Bar", "male").subscribe((json: any) => {
            this.response = JSON.parse(json["_body"]);
            done();
          });
        });

        it('contains a "data" key', () => {
          expect(this.response.data).not.toBeUndefined();
        });

        describe('the data', () => {
          beforeEach(() => {
            this.data = this.response.data;
          });

          check_response_data(this);
        });
      });
    });
  });

  describe('#validate', () => {
    describe('when the response is 200', () => {
      beforeEach(() => {
        spyOn(this.auth_rest_service.http, "get").and.returnValue(Observable.of({
          "status": 200,
          "_body": "{\"success\": true}"
        }));
      });

      it('performs a get to /auth/validate_token', () => {
        let headers: Headers = new Headers();
        this.auth_rest_service.validate(headers);
        expect(this.auth_rest_service.http.get).toHaveBeenCalledWith(
          "http://test.com:80/auth/validate_token",
          new RequestOptions({headers: headers}));
      });

      it('has success = true', (done) => {
        let headers: Headers = new Headers();
        this.auth_rest_service.validate(headers).subscribe((res: any) => {
          expect(JSON.parse(res._body).success).toBeTruthy();
          done();
        });
      });
    });
  });

  describe('#disconnection', () => {
    describe('when the response is 200', () => {
      beforeEach(() => {
        spyOn(this.auth_rest_service.http, "delete").and.returnValue(Observable.of({
          "status": 200
        }));
      });

      it('performs a delete to /auth/sign_out', () => {
        this.auth_rest_service.disconnection();
        expect(this.auth_rest_service.http.delete).toHaveBeenCalledWith(
          "http://test.com:80/auth/sign_out",
          this.auth_rest_service.getHeadersForJSON());
      });
    });
  });

});
