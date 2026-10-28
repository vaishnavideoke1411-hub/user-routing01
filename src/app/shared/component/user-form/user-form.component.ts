import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from '../../service/user-service.service';
import { Iuser } from '../../model/user';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  userForm!: FormGroup
  isInEditMode = false
  userId !: number
  userInfo !: Iuser

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _userService: UserServiceService
  ) {}

  ngOnInit(): void {
    this.createUserForm();

    const id = this.route.snapshot.paramMap.get('id');

    if (id !== null) {
      this.userId = Number(id);
      this.isInEditMode = true;
      this.loadUserData(this.userId);
    }
  }

  createUserForm(): void {
    this.userForm = this.fb.group({
      name: [null, Validators.required],
      role: [null, Validators.required],
      description: [null, Validators.required],
      experience: [null, [Validators.required, Validators.min(0)]],
      status: [true, Validators.required],
      image: [null, Validators.required],

      address: this.fb.group({
        currentAddress: this.fb.group({
          country: [null, Validators.required],
          state: [null, Validators.required],
          city: [null, Validators.required],
          zipcode: [null, Validators.required]
        }),

        permanentAddress: this.fb.group({
          country: [null, Validators.required],
          state: [null, Validators.required],
          city: [null, Validators.required],
          zipcode: [null, Validators.required]
        })
      }),

      sameAdd: [false],

      skills: this.fb.array([
        this.fb.control(null, Validators.required)
      ])
    });

    this.userForm.get('sameAdd')?.valueChanges.subscribe(
      (checked: boolean) => {
        if (checked) {
          this.userForm.get('address.permanentAddress')?.patchValue(
            this.userForm.get('address.currentAddress')?.value
          );
        }
      }
    );

    this.userForm.get('address.currentAddress')?.valueChanges.subscribe(
      (address: any) => {
        if (this.userForm.get('sameAdd')?.value) {
          this.userForm.get('address.permanentAddress')?.patchValue(
            address,
            { emitEvent: false }
          );
        }
      }
    );
  }

  get skills(): FormArray {
    return this.userForm.get('skills') as FormArray;
  }

  addSkill(): void {
    if (this.skills.length < 5) {
      this.skills.push(
        this.fb.control(null, Validators.required)
      );
    }
  }

  removeSkill(index: number): void {
    if (this.skills.length > 1) {
      this.skills.removeAt(index);
    }
  }

  loadUserData(id: number): void {
    this._userService.fetchUserById(id).subscribe({
      next: (user) => {
        if (!user) {
          this.router.navigate(['/user']);
          return;
        }

        this.userForm.patchValue({
          name: user.name,
          role: user.role,
          description: user.description,
          experience: user.experience,
          status: user.status,
          image: user.imageUrl,

          address: {
            currentAddress: user.currentAddress,
            permanentAddress: user.permanentAddress
          },

          sameAdd: false
        });

        this.userForm.setControl(
          'skills',
          this.fb.array(
            user.skills?.length
              ? user.skills.map(
                  skill => this.fb.control(
                    skill,
                    Validators.required
                  )
                )
              : [
                  this.fb.control(null, Validators.required)
                ]
          )
        );
      },

      error: (error) => console.error(error)
    });
  }

  onUserAdd(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    const formValue = this.userForm.getRawValue();
    const newId = this.getNextId();

    const userData: Iuser = {
      id: newId,
      Uid: 'USR' + String(newId).padStart(3, '0'),
      name: formValue.name,
      role: formValue.role,
      description: formValue.description,
      experience: Number(formValue.experience),
      status: formValue.status === true ||
        formValue.status === 'true',
      imageUrl: formValue.image,

      skills: formValue.skills.filter(
        (skill: string) => skill.trim() !== null
      ),

      currentAddress: {
        ...formValue.address.currentAddress
      },

      permanentAddress: {
        ...formValue.address.permanentAddress
      }
    };

    this._userService.postUser(userData).subscribe({
      next: () => this.router.navigate(['/user']),
      error: (error) => console.error(error)
    });
  }

  updateData(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    if (this.userId === null) {
      return;
    }

    this._userService.fetchUserById(this.userId).subscribe({
      next: (existingUser) => {
        if (!existingUser) {
          this.router.navigate(['/user']);
          return;
        }

        const formValue = this.userForm.getRawValue();

        const updatedUser: Iuser = {
          id: existingUser.id,
          Uid: existingUser.Uid,
          name: formValue.name,
          role: formValue.role,
          description: formValue.description,
          experience: Number(formValue.experience),
          status: formValue.status === true ||
            formValue.status === 'true',
          imageUrl: formValue.image,

          skills: formValue.skills.filter(
            (skill: string) => skill.trim() !== ''
          ),

          currentAddress: {
            ...formValue.address.currentAddress
          },

          permanentAddress: {
            ...formValue.address.permanentAddress
          }
        };

        this._userService.updateUser(updatedUser).subscribe({
          next: (savedUser) => {
            if (savedUser) {
              this.router.navigate(['/user', savedUser.id]);
            }
          },

          error: (error) => console.error(error)
        });
      },

      error: (error) => console.error(error)
    });
  }

  private getNextId(): number {
    let nextId = 1;

    this._userService.fetchUser().subscribe(users => {
      nextId = users.length
        ? Math.max(...users.map(user => user.id)) + 1
        : 1;
    });

    return nextId;
  }
}