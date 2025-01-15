memo:

```
create table user(id INTEGER not null, name varchar(255) not null, primary key (id));

create table workout(id INTEGER not null
,date date, memo varchar(255), createdBy integer , primary key (id), foreign key(createdBy) references user(id));

create table type(id INTEGER not null, n
ame varchar(20) not null, part varchar(20) not
null, primary key (id));

create table record(id INTEGER not null,
 tid integer not null, weight integer, reps integer not null, sets integer not null, comment varchar(255), foreign key(tid) references type(id), primary key (id));

```
