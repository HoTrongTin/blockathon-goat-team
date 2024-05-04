create table user (
  ownerAddress varchar(42) primary key,
  name text null,
  avatar text null,
  bio text null,
  gender enum('male', 'female', 'other') null,
  dob date null,
  createdAt timestamp not null default current_timestamp,
  updatedAt timestamp not null default current_timestamp on update current_timestamp
);

create table post (
  id int auto_increment primary key,
  ownerAddress varchar(42) not null,
  name text not null,
  description text not null,
  isPublic boolean not null
  createdAt timestamp not null default current_timestamp,
  updatedAt timestamp not null default current_timestamp on update current_timestamp,
   
  index (ownerAddress),
  index (isPublic),
  index (updatedAt)
);

create table post_asset (
  id int auto_increment primary key,
  postId int not null,
  -- assetType is Enum of 'image', 'video', 'whitelistAddress'
  assetType enum('image', 'video', 'whitelistAddress') not null,
  assetValue text not null,

  index (postId),
  index (assetType)
);

create table post_interaction (
  id int auto_increment primary key,
  postId int not null,
  ownerAddress varchar(42) not null,
  interactionType enum('view', 'like', 'comment') not null,
  claimed boolean not null default false,
  createdAt timestamp not null default current_timestamp,

  index (postId),
  index (ownerAddress),
  index (interactionType),
  index (createdAt)
);

create table reward (
  id int auto_increment primary key,
  ownerAddress varchar(42) not null,
  interactionCount int not null,
  rewardAmount int not null,
  rewardType enum('view', 'like', 'comment') not null,
  transactionHash varchar(66) not null,
  createdAt timestamp not null default current_timestamp,
  updatedAt timestamp not null default current_timestamp on update current_timestamp
);