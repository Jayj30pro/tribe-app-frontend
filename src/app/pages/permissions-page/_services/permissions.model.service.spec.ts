import { PermissionsModelService } from "./permissions.model.service";
import { JWTApiService } from "@savvato-software/savvato-javascript-services";
import { environment } from '../../../_environments/environment';
import { UserRole } from '../_types/user-role.type';
import { User } from '../_types/user.type';
import { TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from "@angular/common/http";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";

describe("PermissionsModelService", () => {
    let service: PermissionsModelService;
    let httpTestingController: HttpTestingController

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [PermissionsModelService], imports: [ IonicModule.forRoot(), HttpClientModule, HttpClientTestingModule]
        });
        service = TestBed.inject (PermissionsModelService);
        httpTestingController = TestBed.inject(HttpTestingController);

    });

    afterEach(() => {
        httpTestingController.verify();
    });

    // it("should return users from getListOfUsers", (done) => {
    //     const mockUsers: User[] = [
    //         {
    //             id:  1,
    //             name: "admin",
    //             password: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    //             phone: "3035551212",
    //             email: "admin@tribeapp.com",
    //             enabled: 1,
    //             created: "2024-08-01 13:10:25.0",
    //             lastUpdated: "2024-08-01 13:10:25.0",
    //             roles: [{name: 'ROLE_admin', id: 1},
    //                 {name: 'ROLE_accountholder', id: 2}]
    //         },
    //         {
    //             id: 2,
    //             name: "testuser",
    //             password: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    //             phone: "3035551213",
    //             email: "testuser@tribeapp.com",
    //             enabled: 1,
    //             created: "2024-08-01 13:10:25.0",
    //             lastUpdated: "2024-08-01 13:10:25.0",
    //             roles: [{name: 'ROLE_admin', id: 1},
    //                 {name: 'ROLE_accountholder', id: 2}]
    //         },
    //         {
    //             id: 3,
    //             name: "testuser2",
    //             password: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    //             phone: "3035551214",
    //             email: "testuser2@tribeapp.com",
    //             enabled: 1,
    //             created: "2024-08-01 13:11:30.0",
    //             lastUpdated: "2024-08-01 13:11:30.0",
    //             roles: [{name: 'ROLE_accountholder', id: 2},
    //                 {name: "ROLE_phrasereviewer", id: 3}]
    //         }
    //     ];

    //     service.getListOfUsers().then((result) => {
    //         expect(result).toEqual(mockUsers);
    //         done();
    //     });

    //     const req = httpTestingController.expectOne(`${environment.apiUrl}/api/permissions/users`);
    //     expect(req.request.method).toEqual('GET');

    //     req.flush(mockUsers);

        
    // });

    it("should return users from getListOfUsers ", () => {
        // const fakeEntry = 
        const fakeUser : User[] = [{
                        id:  1,
                        name: "admin",
                        password: "XYZ",
                        phone: "3035551212",
                        email: "admin@tribeapp.com",
                        enabled: 1,
                        created: "2024-08-01 13:10:25.0",
                        lastUpdated: "2024-08-01 13:10:25.0",
                        roles: [{name: 'ROLE_admin', id: 1},
                            {name: 'ROLE_accountholder', id: 2}]
                    }];
        service.model['listOfUsers'] = fakeUser;
        let response = service.getListOfUsers();
        
        expect(response).toEqual(fakeUser);
        
    });

        


    it("should return roles from getListOfRoles ", () => {
        const mockUserRoles: UserRole = 
            { id: 1, name: 'admin' }
        ;
        service.model['listOfUserRoles'] = mockUserRoles;
        let response = service.getListOfRoles();

        expect(response).toEqual(mockUserRoles);
    });

    it("should test the is dirty function and return false ", () => {
        const dirtyResponse: boolean = false;
        service.dirty =  dirtyResponse;
        let response = service.isDirty();

        expect(response).toEqual(dirtyResponse);
    });

    // it("should return a list of user roles ", () => {
    //     const listOfRoles = [{id: 1, name:'admin'},{id: 2, name:'account_holder'}];
    //     const rolesOnly = ['account_holder', 'admin'];
    //     service.model['listOfUserRoles'] = listOfRoles;
    //     let response = service.getListOfAllRoles('user');
        
    //     expect(response).toEqual(rolesOnly);
        
    // });

    it("should return a list of user roles and call getselectedUserRoles", () => {
        const listOfRoles = [{ id: 1, name: 'admin' }, { id: 2, name: 'account_holder' }];
        const rolesOnly = ['account_holder', 'admin'];
        service.model = { listOfUserRoles: listOfRoles };
    
        // Spy on the getselectedUserRoles method and make it do nothing
        spyOn(service, 'getselectedUserRoles').and.stub(); // `.and.stub()` makes it do nothing
    
        // Call the function under test
        let response = service.getListOfAllRoles('user');
    
        // Verify the response
        expect(response).toEqual(rolesOnly);
    
        // Verify that getselectedUserRoles is called with the correct argument
        expect(service.getselectedUserRoles).toHaveBeenCalledWith('user');
    });
    
    

    // it("description ", () => {
        
    // });
    
    // it("description ", () => {
        
    // });
    
});