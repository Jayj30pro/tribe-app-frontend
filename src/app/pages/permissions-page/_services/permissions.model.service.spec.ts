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


    it("should test the is dirty function and return false ", () => {
        const dirtyResponse: boolean = false;
        service.dirty =  dirtyResponse;
        let response = service.isDirty();

        expect(response).toEqual(dirtyResponse);
    });


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
        service.model= {listOfUserRoles : mockUserRoles};
        let response = service.getListOfRoles();

        expect(response).toEqual(mockUserRoles);
    });

    
    it("should return a list of user roles ", () => {
        const listOfRoles = [{id: 1, name:'admin'},{id: 2, name:'account_holder'}];
        const rolesOnly = ['account_holder', 'admin'];
        service.model = { listOfUserRoles: listOfRoles }; // = service.model['listOfUserRoles'] = listOfRoles;
        spyOn(service, 'getselectedUserRoles').and.stub();
        let response = service.getListOfAllRoles('user');
        

        expect(response).toEqual(rolesOnly);
        expect(service.getselectedUserRoles).toHaveBeenCalledWith('user');
        
    });

    it("should return a list of user roles ", () => {
        const currentUser = "admin";
        
        const fakeUsers = [{
            id:  1,
            name: "admin",
            password: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            phone: "3035551212",
            email: "admin@tribeapp.com",
            enabled: 1,
            created: "2024-08-01 13:10:25.0",
            lastUpdated: "2024-08-01 13:10:25.0",
            roles: [{name: 'ROLE_admin', id: 1},
                {name: 'ROLE_accountholder', id: 2}]
        },
        {
            id: 2,
            name: "testuser",
            password: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            phone: "3035551213",
            email: "testuser@tribeapp.com",
            enabled: 1,
            created: "2024-08-01 13:10:25.0",
            lastUpdated: "2024-08-01 13:10:25.0",
            roles: [{name: 'ROLE_admin', id: 1},
                {name: 'ROLE_accountholder', id: 2}]
        }];

        const recordedRoles = ['ROLE_accountholder', 'ROLE_admin'];
        service.model= {listOfUsers: fakeUsers};
        
        service.getselectedUserRoles(currentUser);
        

        
        expect(service.selectedUserRoles).toEqual(recordedRoles);
        
        
    });

    //option 1
    it("should add roles to empty array newUserRoles, and change to dirty status", () => {
        const startRoles = ["ROLE_accountholder"];
        const endRoles = ["ROLE_accountholder", "ROLE_admin"];
        service.newUserRoles = [];
        service.selectedUserRoles = startRoles;
        service.toggleRoles("ROLE_admin");

        expect(service.newUserRoles.length).toEqual(2);
        expect(service.newUserRoles).toEqual(endRoles);
        expect(service.dirty).toEqual(true);
    });

    //option 2
    it("should remove admin role from newUserRoles, and remove dirty status", () => {
        const endRoles = ["ROLE_accountholder"];
        const  startRoles= ["ROLE_accountholder", "ROLE_admin"];
        service.newUserRoles =  startRoles
        service.selectedUserRoles = startRoles;
        service.toggleRoles("ROLE_admin");

        expect(service.newUserRoles.length).toEqual(1);
        expect(service.newUserRoles).toEqual(endRoles);
        expect(service.dirty).toEqual(false);
    });
    
    

    // it("should return a list of user roles and call getselectedUserRoles", () => {
    //     const listOfRoles = [{ id: 1, name: 'admin' }, { id: 2, name: 'account_holder' }];
    //     const rolesOnly = ['account_holder', 'admin'];
    //     service.model = { listOfUserRoles: listOfRoles };
        
    
    //     // Spy on the getselectedUserRoles method and make it do nothing
    //     spyOn(service, 'getselectedUserRoles').and.stub(); // `.and.stub()` makes it do nothing
    
    //     // Call the function under test
    //     let response = service.getListOfAllRoles('user');
    
    //     // Verify the response
    //     expect(response).toEqual(rolesOnly);
    
    //     // Verify that getselectedUserRoles is called with the correct argument
    //     expect(service.getselectedUserRoles).toHaveBeenCalledWith('user');
    // });
        


    
    // it("clearValues ", () => {
        
    // });

    
    // it("save ", () => {
        
    // });
    
    
});