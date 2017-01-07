// Type definitions for Google Drive API v3
// Project: https://developers.google.com/drive/
// Definitions by: Bolisov Alexey

/// <reference path="../gapi.client/gapi.client.d.ts" />

declare module gapi.client.drive {

  interface About {
    // Whether the user has installed the requesting app.
    appInstalled?: boolean,
    // A map of source MIME type to possible targets for all supported exports.
    exportFormats?: any,
    // The currently supported folder colors as RGB hex strings.
    folderColorPalette?: string[],
    // A map of source MIME type to possible targets for all supported imports.
    importFormats?: any,
    // This is always drive#about.
    kind?: string,
    // A map of maximum import sizes by MIME type, in bytes.
    maxImportSizes?: any,
    // The maximum upload size in bytes.
    maxUploadSize?: string,
    // The user's storage quota limits and usage. All fields are measured in bytes.
    storageQuota?: {
      // The usage limit, if applicable. This will not be present if the user has unlimited storage.
      limit?: string,
      // The total usage across all services.
      usage?: string,
      // The usage by all files in Google Drive.
      usageInDrive?: string,
      // The usage by trashed files in Google Drive.
      usageInDriveTrash?: string,
    },
    // The authenticated user.
    user?: User,
  }

  interface Change {
    // The updated state of the file. Present if the file has not been removed.
    file?: File,
    // The ID of the file which has changed.
    fileId?: string,
    // This is always drive#change.
    kind?: string,
    // Whether the file has been removed from the view of the changes list, for example by deletion or lost access.
    removed?: boolean,
    // The time of this change (RFC 3339 date-time).
    time?: string,
  }

  interface ChangeList {
    // The page of changes.
    changes?: Change[],
    // This is always drive#changeList.
    kind?: string,
    // The starting page token for future changes. This will be present only if the end of the current changes list has been reached.
    newStartPageToken?: string,
    // The page token for the next page of changes. This will be absent if the end of the current changes list has been reached.
    nextPageToken?: string,
  }

  interface Channel {
    // The address where notifications are delivered for this channel.
    address?: string,
    // Date and time of notification channel expiration, expressed as a Unix timestamp, in milliseconds. Optional.
    expiration?: string,
    // A UUID or similar unique string that identifies this channel.
    id?: string,
    // Identifies this as a notification channel used to watch for changes to a resource. Value: the fixed string "api#channel".
    kind?: string,
    // Additional parameters controlling delivery channel behavior. Optional.
    params?: any,
    // A Boolean value to indicate whether payload is wanted. Optional.
    payload?: boolean,
    // An opaque ID that identifies the resource being watched on this channel. Stable across different API versions.
    resourceId?: string,
    // A version-specific identifier for the watched resource.
    resourceUri?: string,
    // An arbitrary string delivered to the target address with each notification delivered over this channel. Optional.
    token?: string,
    // The type of delivery mechanism used for this channel.
    type?: string,
  }

  interface Comment {
    // A region of the document represented as a JSON string. See anchor documentation for details on how to define and interpret anchor properties.
    anchor?: string,
    // The user who created the comment.
    author?: User,
    // The plain text content of the comment. This field is used for setting the content, while htmlContent should be displayed.
    content?: string,
    // The time at which the comment was created (RFC 3339 date-time).
    createdTime?: string,
    // Whether the comment has been deleted. A deleted comment has no content.
    deleted?: boolean,
    // The content of the comment with HTML formatting.
    htmlContent?: string,
    // The ID of the comment.
    id?: string,
    // This is always drive#comment.
    kind?: string,
    // The last time the comment or any of its replies was modified (RFC 3339 date-time).
    modifiedTime?: string,
    // The file content to which the comment refers, typically within the anchor region. For a text file, for example, this would be the text at the location of the comment.
    quotedFileContent?: {
      // The MIME type of the quoted content.
      mimeType?: string,
      // The quoted content itself. This is interpreted as plain text if set through the API.
      value?: string,
    },
    // The full list of replies to the comment in chronological order.
    replies?: Reply[],
    // Whether the comment has been resolved by one of its replies.
    resolved?: boolean,
  }

  interface CommentList {
    // The page of comments.
    comments?: Comment[],
    // This is always drive#commentList.
    kind?: string,
    // The page token for the next page of comments. This will be absent if the end of the comments list has been reached.
    nextPageToken?: string,
  }

  interface File {
    // A collection of arbitrary key-value pairs which are private to the requesting app.
    // Entries with null values are cleared in update and copy requests.
    appProperties?: any,
    // Capabilities the current user has on the file.
    capabilities?: {
      // Whether the user can comment on the file.
      canComment?: boolean,
      // Whether the user can copy the file.
      canCopy?: boolean,
      // Whether the user can edit the file's content.
      canEdit?: boolean,
      // Whether the current user has read access to the Revisions resource of the file.
      canReadRevisions?: boolean,
      // Whether the user can modify the file's permissions and sharing settings.
      canShare?: boolean,
    },
    // Additional information about the content of the file. These fields are never populated in responses.
    contentHints?: {
      // Text to be indexed for the file to improve fullText queries. This is limited to 128KB in length and may contain HTML elements.
      indexableText?: string,
      // A thumbnail for the file. This will only be used if Drive cannot generate a standard thumbnail.
      thumbnail?: {
        // The thumbnail data encoded with URL-safe Base64 (RFC 4648 section 5).
        image?: string,
        // The MIME type of the thumbnail.
        mimeType?: string,
      },
    },
    // The time at which the file was created (RFC 3339 date-time).
    createdTime?: string,
    // A short description of the file.
    description?: string,
    // Whether the file has been explicitly trashed, as opposed to recursively trashed from a parent folder.
    explicitlyTrashed?: boolean,
    // The final component of fullFileExtension. This is only available for files with binary content in Drive.
    fileExtension?: string,
    // The color for a folder as an RGB hex string. The supported colors are published in the folderColorPalette field of the About resource.
    // If an unsupported color is specified, the closest color in the palette will be used instead.
    folderColorRgb?: string,
    // The full file extension extracted from the name field. May contain multiple concatenated extensions, such as "tar.gz". This is only available for files with binary content in Drive.
    // This is automatically updated when the name field changes, however it is not cleared if the new name does not contain a valid extension.
    fullFileExtension?: string,
    // The ID of the file's head revision. This is currently only available for files with binary content in Drive.
    headRevisionId?: string,
    // A static, unauthenticated link to the file's icon.
    iconLink?: string,
    // The ID of the file.
    id?: string,
    // Additional metadata about image media, if available.
    imageMediaMetadata?: {
      // The aperture used to create the photo (f-number).
      aperture?: number,
      // The make of the camera used to create the photo.
      cameraMake?: string,
      // The model of the camera used to create the photo.
      cameraModel?: string,
      // The color space of the photo.
      colorSpace?: string,
      // The exposure bias of the photo (APEX value).
      exposureBias?: number,
      // The exposure mode used to create the photo.
      exposureMode?: string,
      // The length of the exposure, in seconds.
      exposureTime?: number,
      // Whether a flash was used to create the photo.
      flashUsed?: boolean,
      // The focal length used to create the photo, in millimeters.
      focalLength?: number,
      // The height of the image in pixels.
      height?: number,
      // The ISO speed used to create the photo.
      isoSpeed?: number,
      // The lens used to create the photo.
      lens?: string,
      // Geographic location information stored in the image.
      location?: {
        // The altitude stored in the image.
        altitude?: number,
        // The latitude stored in the image.
        latitude?: number,
        // The longitude stored in the image.
        longitude?: number,
      },
      // The smallest f-number of the lens at the focal length used to create the photo (APEX value).
      maxApertureValue?: number,
      // The metering mode used to create the photo.
      meteringMode?: string,
      // The rotation in clockwise degrees from the image's original orientation.
      rotation?: number,
      // The type of sensor used to create the photo.
      sensor?: string,
      // The distance to the subject of the photo, in meters.
      subjectDistance?: number,
      // The date and time the photo was taken (EXIF DateTime).
      time?: string,
      // The white balance mode used to create the photo.
      whiteBalance?: string,
      // The width of the image in pixels.
      width?: number,
    },
    // This is always drive#file.
    kind?: string,
    // The last user to modify the file.
    lastModifyingUser?: User,
    // The MD5 checksum for the content of the file. This is only applicable to files with binary content in Drive.
    md5Checksum?: string,
    // The MIME type of the file.
    // Drive will attempt to automatically detect an appropriate value from uploaded content if no value is provided. The value cannot be changed unless a new revision is uploaded.
    // If a file is created with a Google Doc MIME type, the uploaded content will be imported if possible. The supported import formats are published in the About resource.
    mimeType?: string,
    // The last time the file was modified by the user (RFC 3339 date-time).
    modifiedByMeTime?: string,
    // The last time the file was modified by anyone (RFC 3339 date-time).
    // Note that setting modifiedTime will also update modifiedByMeTime for the user.
    modifiedTime?: string,
    // The name of the file. This is not necessarily unique within a folder.
    name?: string,
    // The original filename of the uploaded content if available, or else the original value of the name field. This is only available for files with binary content in Drive.
    originalFilename?: string,
    // Whether the user owns the file.
    ownedByMe?: boolean,
    // The owners of the file. Currently, only certain legacy files may have more than one owner.
    owners?: User[],
    // The IDs of the parent folders which contain the file.
    // If not specified as part of a create request, the file will be placed directly in the My Drive folder. Update requests must use the addParents and removeParents parameters to modify the values.
    parents?: string[],
    // The full list of permissions for the file. This is only available if the requesting user can share the file.
    permissions?: Permission[],
    // A collection of arbitrary key-value pairs which are visible to all apps.
    // Entries with null values are cleared in update and copy requests.
    properties?: any,
    // The number of storage quota bytes used by the file. This includes the head revision as well as previous revisions with keepForever enabled.
    quotaBytesUsed?: string,
    // Whether the file has been shared.
    shared?: boolean,
    // The time at which the file was shared with the user, if applicable (RFC 3339 date-time).
    sharedWithMeTime?: string,
    // The user who shared the file with the requesting user, if applicable.
    sharingUser?: User,
    // The size of the file's content in bytes. This is only applicable to files with binary content in Drive.
    size?: string,
    // The list of spaces which contain the file. The currently supported values are 'drive', 'appDataFolder' and 'photos'.
    spaces?: string[],
    // Whether the user has starred the file.
    starred?: boolean,
    // A short-lived link to the file's thumbnail, if available. Typically lasts on the order of hours.
    thumbnailLink?: string,
    // Whether the file has been trashed, either explicitly or from a trashed parent folder. Only the owner may trash a file, and other users cannot see files in the owner's trash.
    trashed?: boolean,
    // A monotonically increasing version number for the file. This reflects every change made to the file on the server, even those not visible to the user.
    version?: string,
    // Additional metadata about video media. This may not be available immediately upon upload.
    videoMediaMetadata?: {
      // The duration of the video in milliseconds.
      durationMillis?: string,
      // The height of the video in pixels.
      height?: number,
      // The width of the video in pixels.
      width?: number,
    },
    // Whether the file has been viewed by this user.
    viewedByMe?: boolean,
    // The last time the file was viewed by the user (RFC 3339 date-time).
    viewedByMeTime?: string,
    // Whether users with only reader or commenter permission can copy the file's content. This affects copy, download, and print operations.
    viewersCanCopyContent?: boolean,
    // A link for downloading the content of the file in a browser. This is only available for files with binary content in Drive.
    webContentLink?: string,
    // A link for opening the file in a relevant Google editor or viewer in a browser.
    webViewLink?: string,
    // Whether users with only writer permission can modify the file's permissions.
    writersCanShare?: boolean,
  }

  interface FileList {
    // The page of files.
    files?: File[],
    // This is always drive#fileList.
    kind?: string,
    // The page token for the next page of files. This will be absent if the end of the files list has been reached.
    nextPageToken?: string,
  }

  interface GeneratedIds {
    // The IDs generated for the requesting user in the specified space.
    ids?: string[],
    // This is always drive#generatedIds
    kind?: string,
    // The type of file that can be created with these IDs.
    space?: string,
  }

  interface Permission {
    // Whether the permission allows the file to be discovered through search. This is only applicable for permissions of type domain or anyone.
    allowFileDiscovery?: boolean,
    // A displayable name for users, groups or domains.
    displayName?: string,
    // The domain to which this permission refers.
    domain?: string,
    // The email address of the user or group to which this permission refers.
    emailAddress?: string,
    // The ID of this permission. This is a unique identifier for the grantee, and is published in User resources as permissionId.
    id?: string,
    // This is always drive#permission.
    kind?: string,
    // A link to the user's profile photo, if available.
    photoLink?: string,
    // The role granted by this permission. Valid values are:
    // - owner
    // - writer
    // - commenter
    // - reader
    role?: string,
    // The type of the grantee. Valid values are:
    // - user
    // - group
    // - domain
    // - anyone
    type?: string,
  }

  interface PermissionList {
    // This is always drive#permissionList.
    kind?: string,
    // The full list of permissions.
    permissions?: Permission[],
  }

  interface Reply {
    // The action the reply performed to the parent comment. Valid values are:
    // - resolve
    // - reopen
    action?: string,
    // The user who created the reply.
    author?: User,
    // The plain text content of the reply. This field is used for setting the content, while htmlContent should be displayed. This is required on creates if no action is specified.
    content?: string,
    // The time at which the reply was created (RFC 3339 date-time).
    createdTime?: string,
    // Whether the reply has been deleted. A deleted reply has no content.
    deleted?: boolean,
    // The content of the reply with HTML formatting.
    htmlContent?: string,
    // The ID of the reply.
    id?: string,
    // This is always drive#reply.
    kind?: string,
    // The last time the reply was modified (RFC 3339 date-time).
    modifiedTime?: string,
  }

  interface ReplyList {
    // This is always drive#replyList.
    kind?: string,
    // The page token for the next page of replies. This will be absent if the end of the replies list has been reached.
    nextPageToken?: string,
    // The page of replies.
    replies?: Reply[],
  }

  interface Revision {
    // The ID of the revision.
    id?: string,
    // Whether to keep this revision forever, even if it is no longer the head revision. If not set, the revision will be automatically purged 30 days after newer content is uploaded. This can be set on a maximum of 200 revisions for a file.
    // This field is only applicable to files with binary content in Drive.
    keepForever?: boolean,
    // This is always drive#revision.
    kind?: string,
    // The last user to modify this revision.
    lastModifyingUser?: User,
    // The MD5 checksum of the revision's content. This is only applicable to files with binary content in Drive.
    md5Checksum?: string,
    // The MIME type of the revision.
    mimeType?: string,
    // The last time the revision was modified (RFC 3339 date-time).
    modifiedTime?: string,
    // The original filename used to create this revision. This is only applicable to files with binary content in Drive.
    originalFilename?: string,
    // Whether subsequent revisions will be automatically republished. This is only applicable to Google Docs.
    publishAuto?: boolean,
    // Whether this revision is published. This is only applicable to Google Docs.
    published?: boolean,
    // Whether this revision is published outside the domain. This is only applicable to Google Docs.
    publishedOutsideDomain?: boolean,
    // The size of the revision's content in bytes. This is only applicable to files with binary content in Drive.
    size?: string,
  }

  interface RevisionList {
    // This is always drive#revisionList.
    kind?: string,
    // The full list of revisions.
    revisions?: Revision[],
  }

  interface StartPageToken {
    // This is always drive#startPageToken.
    kind?: string,
    // The starting page token for listing changes.
    startPageToken?: string,
  }

  interface User {
    // A plain text displayable name for this user.
    displayName?: string,
    // The email address of the user. This may not be present in certain contexts if the user has not made their email address visible to the requester.
    emailAddress?: string,
    // This is always drive#user.
    kind?: string,
    // Whether this user is the requesting user.
    me?: boolean,
    // The user's ID as visible in Permission resources.
    permissionId?: string,
    // A link to the user's profile photo, if available.
    photoLink?: string,
  }

  interface AboutResource {
    // Gets information about the user, the user's Drive, and system capabilities.
    get (request: {
    }): gapi.client.Request<About>;

  }


  interface ChangesResource {
    // Gets the starting pageToken for listing future changes.
    getStartPageToken (request: {
    }): gapi.client.Request<StartPageToken>;

    // Lists changes for a user.
    list (request: {
      // Whether to include changes indicating that items have left the view of the changes list, for example by deletion or lost access.
      includeRemoved?: boolean,
      // The maximum number of changes to return per page.
      pageSize?: number,
      // The token for continuing a previous list request on the next page. This should be set to the value of 'nextPageToken' from the previous response or to the response from the getStartPageToken method.
      pageToken: string,
      // Whether to restrict the results to changes inside the My Drive hierarchy. This omits changes to files such as those in the Application Data folder or shared files which have not been added to My Drive.
      restrictToMyDrive?: boolean,
      // A comma-separated list of spaces to query within the user corpus. Supported values are 'drive', 'appDataFolder' and 'photos'.
      spaces?: string,
    }): gapi.client.Request<ChangeList>;

    // Subscribes to changes for a user.
    watch (request: {
      // Whether to include changes indicating that items have left the view of the changes list, for example by deletion or lost access.
      includeRemoved?: boolean,
      // The maximum number of changes to return per page.
      pageSize?: number,
      // The token for continuing a previous list request on the next page. This should be set to the value of 'nextPageToken' from the previous response or to the response from the getStartPageToken method.
      pageToken: string,
      // Whether to restrict the results to changes inside the My Drive hierarchy. This omits changes to files such as those in the Application Data folder or shared files which have not been added to My Drive.
      restrictToMyDrive?: boolean,
      // A comma-separated list of spaces to query within the user corpus. Supported values are 'drive', 'appDataFolder' and 'photos'.
      spaces?: string,
    }): gapi.client.Request<Channel>;

  }


  interface ChannelsResource {
    // Stop watching resources through this channel
    stop (request: {
    }): gapi.client.Request<void>;

  }


  interface CommentsResource {
    // Creates a new comment on a file.
    create (request: {
      // The ID of the file.
      fileId: string,
    }): gapi.client.Request<Comment>;

    // Deletes a comment.
    delete (request: {
      // The ID of the comment.
      commentId: string,
      // The ID of the file.
      fileId: string,
    }): gapi.client.Request<void>;

    // Gets a comment by ID.
    get (request: {
      // The ID of the comment.
      commentId: string,
      // The ID of the file.
      fileId: string,
      // Whether to return deleted comments. Deleted comments will not include their original content.
      includeDeleted?: boolean,
    }): gapi.client.Request<Comment>;

    // Lists a file's comments.
    list (request: {
      // The ID of the file.
      fileId: string,
      // Whether to include deleted comments. Deleted comments will not include their original content.
      includeDeleted?: boolean,
      // The maximum number of comments to return per page.
      pageSize?: number,
      // The token for continuing a previous list request on the next page. This should be set to the value of 'nextPageToken' from the previous response.
      pageToken?: string,
      // The minimum value of 'modifiedTime' for the result comments (RFC 3339 date-time).
      startModifiedTime?: string,
    }): gapi.client.Request<CommentList>;

    // Updates a comment with patch semantics.
    update (request: {
      // The ID of the comment.
      commentId: string,
      // The ID of the file.
      fileId: string,
    }): gapi.client.Request<Comment>;

  }


  interface FilesResource {
    // Creates a copy of a file and applies any requested updates with patch semantics.
    copy (request: {
      // The ID of the file.
      fileId: string,
      // Whether to ignore the domain's default visibility settings for the created file. Domain administrators can choose to make all uploaded files visible to the domain by default; this parameter bypasses that behavior for the request. Permissions are still inherited from parent folders.
      ignoreDefaultVisibility?: boolean,
      // Whether to set the 'keepForever' field in the new head revision. This is only applicable to files with binary content in Drive.
      keepRevisionForever?: boolean,
      // A language hint for OCR processing during image import (ISO 639-1 code).
      ocrLanguage?: string,
    }): gapi.client.Request<File>;

    // Creates a new file.
    create (request: {
      // Whether to ignore the domain's default visibility settings for the created file. Domain administrators can choose to make all uploaded files visible to the domain by default; this parameter bypasses that behavior for the request. Permissions are still inherited from parent folders.
      ignoreDefaultVisibility?: boolean,
      // Whether to set the 'keepForever' field in the new head revision. This is only applicable to files with binary content in Drive.
      keepRevisionForever?: boolean,
      // A language hint for OCR processing during image import (ISO 639-1 code).
      ocrLanguage?: string,
      // Whether to use the uploaded content as indexable text.
      useContentAsIndexableText?: boolean,
    }): gapi.client.Request<File>;

    // Permanently deletes a file owned by the user without moving it to the trash. If the target is a folder, all descendants owned by the user are also deleted.
    delete (request: {
      // The ID of the file.
      fileId: string,
    }): gapi.client.Request<void>;

    // Permanently deletes all of the user's trashed files.
    emptyTrash (request: {
    }): gapi.client.Request<void>;

    // Exports a Google Doc to the requested MIME type and returns the exported content.
    export (request: {
      // The ID of the file.
      fileId: string,
      // The MIME type of the format requested for this export.
      mimeType: string,
    }): gapi.client.Request<void>;

    // Generates a set of file IDs which can be provided in create requests.
    generateIds (request: {
      // The number of IDs to return.
      count?: number,
      // The space in which the IDs can be used to create new files. Supported values are 'drive' and 'appDataFolder'.
      space?: string,
    }): gapi.client.Request<GeneratedIds>;

    // Gets a file's metadata or content by ID.
    get (request: {
      // Whether the user is acknowledging the risk of downloading known malware or other abusive files. This is only applicable when alt=media.
      acknowledgeAbuse?: boolean,
      // The ID of the file.
      fileId: string,
    }): gapi.client.Request<File>;

    // Lists or searches files.
    list (request: {
      // The source of files to list.
      corpus?: string,
      // A comma-separated list of sort keys. Valid keys are 'createdTime', 'folder', 'modifiedByMeTime', 'modifiedTime', 'name', 'quotaBytesUsed', 'recency', 'sharedWithMeTime', 'starred', and 'viewedByMeTime'. Each key sorts ascending by default, but may be reversed with the 'desc' modifier. Example usage: ?orderBy=folder,modifiedTime desc,name. Please note that there is a current limitation for users with approximately one million files in which the requested sort order is ignored.
      orderBy?: string,
      // The maximum number of files to return per page.
      pageSize?: number,
      // The token for continuing a previous list request on the next page. This should be set to the value of 'nextPageToken' from the previous response.
      pageToken?: string,
      // A query for filtering the file results. See the "Search for Files" guide for supported syntax.
      q?: string,
      // A comma-separated list of spaces to query within the corpus. Supported values are 'drive', 'appDataFolder' and 'photos'.
      spaces?: string,
    }): gapi.client.Request<FileList>;

    // Updates a file's metadata and/or content with patch semantics.
    update (request: {
      // A comma-separated list of parent IDs to add.
      addParents?: string,
      // The ID of the file.
      fileId: string,
      // Whether to set the 'keepForever' field in the new head revision. This is only applicable to files with binary content in Drive.
      keepRevisionForever?: boolean,
      // A language hint for OCR processing during image import (ISO 639-1 code).
      ocrLanguage?: string,
      // A comma-separated list of parent IDs to remove.
      removeParents?: string,
      // Whether to use the uploaded content as indexable text.
      useContentAsIndexableText?: boolean,
    }): gapi.client.Request<File>;

    // Subscribes to changes to a file
    watch (request: {
      // Whether the user is acknowledging the risk of downloading known malware or other abusive files. This is only applicable when alt=media.
      acknowledgeAbuse?: boolean,
      // The ID of the file.
      fileId: string,
    }): gapi.client.Request<Channel>;

  }


  interface PermissionsResource {
    // Creates a permission for a file.
    create (request: {
      // A custom message to include in the notification email.
      emailMessage?: string,
      // The ID of the file.
      fileId: string,
      // Whether to send a notification email when sharing to users or groups. This defaults to true for users and groups, and is not allowed for other requests. It must not be disabled for ownership transfers.
      sendNotificationEmail?: boolean,
      // Whether to transfer ownership to the specified user and downgrade the current owner to a writer. This parameter is required as an acknowledgement of the side effect.
      transferOwnership?: boolean,
    }): gapi.client.Request<Permission>;

    // Deletes a permission.
    delete (request: {
      // The ID of the file.
      fileId: string,
      // The ID of the permission.
      permissionId: string,
    }): gapi.client.Request<void>;

    // Gets a permission by ID.
    get (request: {
      // The ID of the file.
      fileId: string,
      // The ID of the permission.
      permissionId: string,
    }): gapi.client.Request<Permission>;

    // Lists a file's permissions.
    list (request: {
      // The ID of the file.
      fileId: string,
    }): gapi.client.Request<PermissionList>;

    // Updates a permission with patch semantics.
    update (request: {
      // The ID of the file.
      fileId: string,
      // The ID of the permission.
      permissionId: string,
      // Whether to transfer ownership to the specified user and downgrade the current owner to a writer. This parameter is required as an acknowledgement of the side effect.
      transferOwnership?: boolean,
    }): gapi.client.Request<Permission>;

  }


  interface RepliesResource {
    // Creates a new reply to a comment.
    create (request: {
      // The ID of the comment.
      commentId: string,
      // The ID of the file.
      fileId: string,
    }): gapi.client.Request<Reply>;

    // Deletes a reply.
    delete (request: {
      // The ID of the comment.
      commentId: string,
      // The ID of the file.
      fileId: string,
      // The ID of the reply.
      replyId: string,
    }): gapi.client.Request<void>;

    // Gets a reply by ID.
    get (request: {
      // The ID of the comment.
      commentId: string,
      // The ID of the file.
      fileId: string,
      // Whether to return deleted replies. Deleted replies will not include their original content.
      includeDeleted?: boolean,
      // The ID of the reply.
      replyId: string,
    }): gapi.client.Request<Reply>;

    // Lists a comment's replies.
    list (request: {
      // The ID of the comment.
      commentId: string,
      // The ID of the file.
      fileId: string,
      // Whether to include deleted replies. Deleted replies will not include their original content.
      includeDeleted?: boolean,
      // The maximum number of replies to return per page.
      pageSize?: number,
      // The token for continuing a previous list request on the next page. This should be set to the value of 'nextPageToken' from the previous response.
      pageToken?: string,
    }): gapi.client.Request<ReplyList>;

    // Updates a reply with patch semantics.
    update (request: {
      // The ID of the comment.
      commentId: string,
      // The ID of the file.
      fileId: string,
      // The ID of the reply.
      replyId: string,
    }): gapi.client.Request<Reply>;

  }


  interface RevisionsResource {
    // Permanently deletes a revision. This method is only applicable to files with binary content in Drive.
    delete (request: {
      // The ID of the file.
      fileId: string,
      // The ID of the revision.
      revisionId: string,
    }): gapi.client.Request<void>;

    // Gets a revision's metadata or content by ID.
    get (request: {
      // Whether the user is acknowledging the risk of downloading known malware or other abusive files. This is only applicable when alt=media.
      acknowledgeAbuse?: boolean,
      // The ID of the file.
      fileId: string,
      // The ID of the revision.
      revisionId: string,
    }): gapi.client.Request<Revision>;

    // Lists a file's revisions.
    list (request: {
      // The ID of the file.
      fileId: string,
    }): gapi.client.Request<RevisionList>;

    // Updates a revision with patch semantics.
    update (request: {
      // The ID of the file.
      fileId: string,
      // The ID of the revision.
      revisionId: string,
    }): gapi.client.Request<Revision>;

  }

}

declare module gapi.client.drive {
  var about: gapi.client.drive.AboutResource;

  var changes: gapi.client.drive.ChangesResource;

  var channels: gapi.client.drive.ChannelsResource;

  var comments: gapi.client.drive.CommentsResource;

  var files: gapi.client.drive.FilesResource;

  var permissions: gapi.client.drive.PermissionsResource;

  var replies: gapi.client.drive.RepliesResource;

  var revisions: gapi.client.drive.RevisionsResource;

}