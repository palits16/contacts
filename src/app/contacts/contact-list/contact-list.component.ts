import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { selectAllContacts } from '../../store/contact.selectors';
import { Subject, takeUntil } from 'rxjs';
import { Contact } from '../../models/contact.model';
import { loadContacts } from '../../store/contact.actions';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-contacts',
  imports: [RouterModule ,MatTableModule, MatPaginatorModule, MatButtonModule, MatIconModule],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.scss',
  standalone: true,
})
export class ContactListComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  private destroy: Subject<void> = new Subject();
  displayedColumns: string[] = ['id', 'firstname', 'surname', 'dob'];
  dataSource = new MatTableDataSource<Contact>();

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadContacts());
    this.store
      .select(selectAllContacts)
      .pipe(takeUntil(this.destroy))
      .subscribe((contacts: Contact[]) => {
        this.dataSource.data = contacts;
        this.dataSource.paginator = this.paginator;
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
