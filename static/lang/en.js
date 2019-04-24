module.exports = {
  navbar: {
    logOut: 'Sign Out',
    zh: 'Chinese',
    en: 'English',
    title: 'KOALA CLOUD'
  },
  login: {
    accountSub: 'Account login',
    submit: 'Login',
    rememberAcc: 'Remember account number',
    forgetPass: 'Forget password',
    pleaseEnterAcc: 'Please enter your account number', // 请输入账号
    pleaseEnterPass: 'Please input a password', // 请输入密码
    homePage: 'Home Page', // 首页
    length1: 'Length of 3 to 40 characters', // 长度在 3 到 40 个字符
    length2: 'Length of 1 to 40 characters', // 长度在 3 到 40 个字符
    platFormName: 'Koala Cloud' // 考拉云平台
  },
  // 主页
  workbench: {
    boxTitle: {
      security: 'Security Warning',
      management: 'Management Assistant',
      Operation: 'Operation Log'
    },
    securityTxt: {
      platform: 'Platform Warning',
      device: 'Device Warning'
    },
    helperTxt: {
      platform: 'Platform Detection',
      Terminal: 'Terminal Detection',
      Debugging: 'Device Debugging'
    },
    appBox: {
      title: 'Application Management',
      appInsert: 'App Insert'
    },
    appList: {
      access: 'Access System',
      attendance: 'Attendance System',
      monitor: 'Monitor System'
    }
  },
  // 预警查看
  alarmCenter: {
    mainTitle: 'Warning Center',
    platform: 'Platform Warning',
    device: 'Device Warning',
    level: 'Warning Level',
    type: 'Event Type',
    event: 'Warning Event',
    time: 'Warning Time',
    detail: 'Warning Detail',
    index: 'Index',
    operation: 'Operation',
    search: 'Search',
    to: 'to',
    startDate: 'Start Date',
    endDate: 'End Date'
  },
  //操作日志
  operation: {
    OperationLog: 'Operation log',
    administratorAccount: 'Administrator account',
    mainFunction: 'Main function',
    time: 'Time',
    search: 'Search',
    operation: 'Operation',
    to: 'to',
    startDate: 'Start Date',
    endDate: 'End Date'
  },
  //识别记录
  accessRecords: {
    identification: 'Identification record',
    nameOrNum: 'Name or number',
    time: 'Time',
    trafficResults: 'Traffic results',
    personnelType: 'Personnel type',
    equipment: 'Equipment',
    inOut: 'Import and export types',
    search: 'Search',
    all: 'all',
    number: 'Number',
    snapPhotos: 'Snap photos',
    detailsAlert: {
      title: 'Details of Pass Records',
      noPhotos: 'No photos',
      noResult: 'No result',
      null: 'null',
      time: 'Time',
      equipment: 'Equipment',
      inOut: 'Divergence type',
      passageWay: 'PassageWay',
      results: 'Validate result'
    }
  },
  // 设备列表
  deviceList: {
    camera: 'Camera',
    recorder: 'Recorder',
    intelligentHardware: 'Intelligent Hardware',
    status: 'Status',
    deviceName: 'Device Name',
    ip: 'IP',
    all: 'All',
    deviceType: 'Device Type',
    addDevice: 'Add Device',
    batchGroup: 'Batch Grouping',
    batchGroupSuccess: 'Batch group success',
    batchImport: 'Batch Import',
    batchSetting: 'Batch Setting',
    batchUpdate: 'Batch Update',
    refreshList: 'Refresh List',
    factoryReset: 'Factory Reset',
    paramsSetting: 'Setting',
    addCamera: 'Adding Camera',
    editingCamera: 'Editing Camera',
    addRecorder: 'Adding Recorder',
    editingRecorder: 'Editing Recorder',
    addIntelligent: 'Adding Intelligent Hardware',
    editingIntelligent: 'Editing Intelligent Hardware',
    modifyGrouping: 'Grouping',
    update: 'Update',
    index: 'Index',
    group: 'Group',
    name: 'Name',
    port: 'Port',
    protocol: 'Protocol',
    user: 'User',
    passWord: 'PassWord',
    sourceAddress: 'Address',
    operation: 'Operation',
    connectingCamera: 'Connecting Camera',
    sn: 'SN',
    administrator: 'Administrator',
    time: 'Operation Time',
    passageway: 'Passageway',
    addInfo: 'The device is already in the list!',
    exists: 'Device already exists',
    please: 'Please enter  ',
    select: 'Please Select  ',
    snNumber: 'snNumber',
    selectDevice: 'Please select equipment!',
    refreshSuccess: 'Device list refreshed!',
    deviceGroup: 'Device group',
    ipAddress: 'Device IP address',
    macAddress: 'Device MAC address',
    version: 'Device software version',
    admin: 'Admin',
    latitude: 'Latitude',
    longitude: 'Longitude',
    position: 'Position',
    editPosition: 'Edit position',
    classify: 'Area classify',
    sourceId: 'sourceId',
    producer: 'producer'
  },
  // 设备管理
  deviceControl: {
    addGroup: 'Adding Device Group',
    editGroup: 'Edit Device Group',
    deleteGroup: 'Delete Device Group',
    groupName: 'Group Name',
    groupDescription: 'Group Description',
    cantDelete: 'Unable to delete device group under which devices are bound!',
    viewGroup: 'View group devices',
    needTodelete: 'Whether to delete the selected device group?',
    modifiedSuccess: 'Modified success!',
    insertSuccess: 'Insert success!',
    inGroup: 'In-group equipment',
    import: 'Batch import equipment',
  },
  // 导入设备
  importDevice: {
    upload: 'Upload',
    preview: 'Preview',
    done: 'Done',
    template: 'Excel template',
    stepOne: 'Step 1: download the imported data.',
    stepTwo: 'Step 2: enter the data by the template(red is required)',
    selectType: 'Select the type to import:',
    plzType: 'type',
    file: 'Device information file:',
    nextStep: 'Next step',
    lastStep: 'Last step',
    import: 'Import',
    export: 'Export data',
    error: 'Error reason',
    importList: 'Import List',
    importSuccess: 'Import device completed!'
  },
  //设备管理员
  deviceAdministrator: {
    administrator: 'Equipment Administrator',
    modify: 'Modifying Administrator',
    added: 'Add',
    name: 'Name',
    photo: 'Photo',
    password: 'Password',
    nameA: "Name",
    photoA: "Photo",
    associatedA: "Associated device",
    passwordA: "Password",
    associated: 'Associated device',
    enterName: 'Please enter the administrator\'s name'
  },
  //单位管理
  roleManage: {
    title: "Unit management",
    add: "Add",
    index: 'Index',
    name: 'Role name',
    describe: 'Role description',
    selection: 'Permission selection',
  },
  //账号权限列表
  allocation: {
    list: 'List of account permissions',
    add: 'Add',
    enabled: 'Batch enabled',
    disable: 'Batch disable',
    index: "Index",
    number: 'Account number',
    role: 'Account role',
    state: 'State',
    tenant: 'Tenant',
    manipulation: 'Role manipulation',
    authorized: 'Authorized role',
    inf: {
      mechanism: 'Mechanism',
      organization: 'Organization',
      password: 'Password',
      email: 'Email',
      phone: 'Phone number',
      creator: 'Creator',
      status: 'Account status',
      manager: 'Account Manager',
    }
  },
  //单位管理
  unitManage: {
    title: 'Unit management',
    name: 'Unit name',
    introduction: 'Unit introduction',
    upload: 'Upload Scene Map',
    requirement: 'Upload up to six pictures per scene.',
    modify: 'Modify',
    save: 'Save',
    className: 'Classification name',
    description: 'Specific description',
    pictures: 'Show pictures',
    panorama: 'VR Panorama',
    chooseP: 'Please select the file'
  },
  //单位展示
  home: {
    unit: 'Unit display',
    knowledge: 'Breaking through the boundaries of human knowledge',
    scene: 'Scene display',
  },
  //高频词汇
  common: {
    to: 'to',
    startDate: 'Start Date',
    endDate: 'End Date',
    search: 'Search',
    batchDeletion: 'Batch Deletion',
    operation: 'Operation',
    details: 'Details',
    delete: 'Delete',
    edit: 'Edit',
    cancel: 'Cancel',
    ok: 'OK',
    close: 'Close',
    batchRemove: 'Batch Deletion',
    enabled: 'enabled',
    disable: 'disable',
    complete: 'complete',
    findSuccess: 'Find success!',
    findFailed: 'Find failed!',
    insertSuccess: 'Insert success!',
    insertFailed: 'Insert failed!',
    updateSuccess: 'Update success!',
    updateFailed: 'Update failed!',
    deleteSuccess: 'Delete success!',
    deleteFailed: 'Delete failed!',
    serviceError: 'Service error!',
    addSuccess: 'Add success',
    modifySuccess: 'Modified success',
    importSuccess: 'Import success',
    importFailed: 'Import failed',
    importFailedInfo: 'Import failed: Keep the type consistent and the format correct'
  },
  //人员信息
  personInf: {
    name: 'Name',
    photo: 'photo',
    code: 'Code',
    sex: 'Sex',
    id: 'ID number',
    email: 'Email',
    phone: 'Phone number',
    type: 'Personnel type',
    organization: 'Organization',
  },
   //人员类型
  personnelType: {
    numFiledTips: 'Only 20 fields can be uploaded',
    title: 'Personnel Type',
    add: 'Types of new personnel',
    field: 'Setting Personnel Field Information',
    edit: 'Editor type',
    typeName: 'Type name',
    infField: 'Field',
    name: 'name',
    code: 'code',
    number: 'Number',
    explain: 'Note: If you need to set the required fields, please tick them before the corresponding fields.',
    group: 'Grouping',
    yes: 'Yes',
    no: 'No',
    new: 'New attribute',
    unchecked: 'Unchecked',
    selection: 'Selection',
    inputField: 'Input field', // 输入字段
    pleaseEnterTypeName: 'Please enter a type name', //请输入类型名称
    getPersonFailed: 'Personnel type acquisition failed', // 人员类型获取失败
    addPersonType: 'Add Person Type' // 新增人员类型
  },
  // 人员列表
  peopleManageList: {
    name: 'name',
    code: 'code',
    search: 'search',
    batchgrouping: 'Batch grouping', // 批量分组
    newGroup: 'New grouping', // 新增分组
    editGroup: 'Edit Device Group', // 修改分组
    groupName: 'Group name', // 分组名称
    groupDescription: 'Group description', // 分组描述
    pleaseEnterDis: 'Please enter a group description', // 请输入分组描述
    deleteGroup: 'Delete grouping', // 删除分组
    addPeople: 'add people', // 新增人员
    editPeople: 'edit people', // 编辑人员
    personDetails: 'Personnel details',
    batchImport: 'Batch import', // 批量导入
    importPeopleInfoFile: 'Import personnel information', // 导入人员信息文件
    importPeoplePhotoFifle: 'Import Personnel Photos', //导入人员照片文件
    batchDelet: 'Batch deletion', // 批量删除
    export: 'export', // 导出
    import: 'import', // 导入
    tips: 'Tips', // 提示
    firstStep: 'Step 1: Download the import data', // 第一步
    excelTemplate: 'Excel template',
    secondStep: 'Step 2: Fill in the import data according to the template requirements (marked red is required)',
    thirdStep: 'Step 3: Click the "Add File" button below to import the data',
    careTips: 'You can only upload. xls and. xlsx files and import up to 100,000 data at a time.',
    careFul: ['Matters needing attention:', '1. There should be no more people in the photos.', '2. Faces in photos can not be occluded.', '3. Photo quality is blurred.', '4. The pose of the face in the photo is not dignified enough.', '5. Face makeup in photos'],
    personCode: 'Naming Photo Files with Personnel Number or Identity Card Number', // 用人员编号或身份证编号命名照片文件
    personPhoto: 'Name Photo Files with Excel "Photo Name Column', // 以Excel"照片名栏"命名照片文件
    people: 'people',
    noImportPeople: 'Non-importable Number', // 不可导入人数,
    noImPeopleList: 'Non-Importable Personnel List', // 不可导入人员列表
    kImportPeople: 'Number of importable persons', // 可导入人数
    exportFailList: 'Export Failure List', // 导出失败名单
    queryGroup: 'Query grouping', // 查询分组
    uploadFile: 'Upload files', // 上传文件
    importList: 'Import list', //导入列表
    piecesData: 'pieces of data', // 条数据
    importedPeople: 'Number of imported persons', // 已导入人数
    importFailPeople: 'Number of Import Failures', // 导入失败人数
    importFailPeopleList: 'Import Failure Number List', // 导入失败列表
    photoName: 'Photo name', // 照片名字
    photo: 'photo', // 照片
    pleaseEnter: 'please enter', // 请输入
    photoErrorTips: 'There may not be this person or the picture quality is not up to standard', // 可能没有这个人员或者图片质量不合格
    errorReason: 'Error reason', // 错误原因
    nextStep: 'Next step', // 下一步
    upStep: 'Previous step', // 上一步
    uploadPhoto: 'Upload photos', // 上传照片
    uploadErrorPeopleList: 'Upload the list of failed people', // 上传失败人员名单
    dataImCom: 'Data Import Completion', // 数据导入完成
    successImport: 'You have successfully imported', // 你已成功导入
    peronnelData: 'Personnel Data', // 人员数据
    dataPreview: 'Data preview', // 数据预览
    pictureName: 'pictureName', // 图片名称
    succImport: 'Successful import', // 导入成功
    importPhotoInfo: 'Import Photo Information', // 导入照片信息
    personInfo: 'Personnel information',
    sucessBatchGroup: 'Successful batch grouping', // 批量分组成功
    failBatchGroup: 'Batch grouping failure', // 批量分组失败
    zfLength: 'Length of 1 to 30 characters', // 长度在1到30个字符
    imgDuplicated: 'The image name has been duplicated', // 图片名称已重复
    beingIm: 'Being implemented', // 正在执行
    pleaseUploadPhoto: 'Only upload JPG or PNG pictures', // 请上传照片
    notEmpty: 'Can not be empty', // 不能为空
    isDeleteGroup: 'Whether to delete the selected grouping', // 是否删除选中的分组
    delGroupSucess: 'Delete Groups Successfully!', // 删除分组成功
    pleaseEnterGroupName: 'Please fill in the group name', // 请填写分组名称
    addGroupSuccess: 'New Groups Successful', // 新增分组成功
    addGroupFail: 'New grouping failed', // 新增分组失败
    editGroupSuccess: 'New Editors Grouped Successfully', // 编辑分组成功
    editGroupFail: 'Edit Grouping Failed', // 编辑分组失败
    pleaseSelType: 'Please choose a type of person', // 请选择一个人员类型
    fieldTips: 'Fields can only be letters', // 字段不能为空且只能是字母
    fieldDupTips: 'Fields cannot be duplicated', // 字段不能重复
    personTemplate: 'Template',
    photoZl: 'Photo pixels at least 100*100, Please re-upload', // 照片质量不合格
  },
  parameter: {
    importConfig: 'Import config',
    back: 'Back',
    generalConfig: 'General config',
    langAndTime: 'Language&Time',
    lang: 'Language',
    area: 'Area',
    timeZone: 'Zone',
    dateFormat: 'Date format',
    twentyfour: 'Twenty-four',
    on: 'On',
    off: 'Off',
    autoUpdate: 'Auto update',
    voiceAndTips: 'Voice&Tips',
    voice: 'Voice',
    txtTips: 'Text tips',
    validateSuccess: 'Validate success',
    validateFailed: 'Validate failed',
    plsEnter: 'Please enter',
    plsSelect: 'Please select',
    blacklist: 'Blacklist',
    promptTime: 'Prompt time(s)',
    messageAndAdvertising: 'Message&Advertising',
    standbyPageText: 'Standby page text',
    corporateName: 'Corporate name',
    welcomeSpeech: 'Welcome',
    corporateLogo: 'Logo',
    standbyAnimation: 'Standby animation',
    upload: 'Upload',
    clickUpload: 'Click upload',
    uploadOnly: 'Only upload three JPG / png files, and no more than 500 KB',
    timeInterval: 'Time interval(s)',
    cycleSwitch: 'Cycle switch',
    messageNotification: 'Message notification',
    promptContent: 'Prompt content',
    lockTime: 'Lock time',
    accessSetting: 'Access setting',
    accessSceneChoice: 'Access scene choice',
    applicable: 'For the exhibition, conference etc.',
    documentation: 'Documentation',
    selectDeviceAccessWay: 'Select device access way',
    face: 'Face with local library 1:N verification',
    QRcode: '2-D Code and Local Library 1:N Verification',
    accessControlMode: 'Access control mode',
    accessType: 'Access type',
    equipmentUpgrade: 'Equipment upgrade',
    automaticUpgrade: 'Automatic upgrade',
    onAutoUpdate: 'Open the automatic upgrade, the system will automatically update the network state',
    save: 'Save',
    export: 'Export',
    successcantnull: 'To verify the success of text can not be empty',
    failedcantnull: 'When validation fails text cannot be empty',
    blackListcantnull: 'User blacklist text cannot be empty',
    logocannull: 'Logo pictures cannot be empty',
    standbycantnull: 'Standby covers should not be empty',
    companynamecantnull: 'Company name cannot be empty',
    welcomecantnull: 'Welcome words cannot be empty',
    onlyPic: 'Only uploading pictures is allowed',
    formatError: 'The picture format is incorrect',
    fastScene: 'fast Scene',
    noRight: 'No access rights'
  },
  //删除
  delete: {
    choose: 'Select the row to delete',
    deleteRole: 'Delete Role',
    deleteRow: 'Are you sure to delete the selected row?',
    deleteRoleY: 'Do you want to delete this role?',
    deleteIt: 'Are you sure you want to delete it?',
    prompt: 'Delete prompt',
    cancel: 'Cancel',
    ok: 'OK',
    del: 'delete',
    deleteZh: 'Delete account',
    deleteZhS: 'Are you sure you want to delete this account?',
    canceledDeletion: 'Canceled deletion',
    success: 'Delete successful!',
    deleteFail: 'Delete failed',
    tips: 'Tips',
    determine: 'Determine to delete the selected device?',
  },
  separator: {
    home: 'Home',
    view: 'Warning view',
    workbench: 'Workbench',
    deviceManage: 'Device manage',
    deviceList: 'Device list',
    deviceAdministrator: 'Device administrator',
    peopleManagement: 'Personnel management',
    peopleType: 'Personnel type',
    peopleList: 'People list',
    dataManagement: 'Data management',
    record: 'Identification record',
    log: 'Operation log',
    systemManagement: 'System management',
    systemHome: 'System home',
    unitManagement: 'Unit management',
    roleManagement: 'Role management',
    permissionAssignment: 'Permission assignment'
  },
  //禁用或启用
  disable: {
    disableOne: 'Do you disable the account?',
    disableAll: 'Do you disable the selected account?',
    disableUser: 'Disable account',
    disableUserAll: 'Batch Banned Accounts',
    openAcc: 'Do you open the account?',
    openAccALL: 'Do you want to open accounts in batches?',
    EnablingAccount: 'Enabling account?',
    EnablingAccountAll: 'Batch Opening Account',
    pleaseChoose: 'Please select the line to operate on',
    cancel: 'Cancel',
    ok: 'OK',
    success: 'Successful operation',
    cancelO: 'Canceled operation'
  },
  placeholder: {
    plsPersonName: 'Please enter the role name',
    plsAccount: 'Please enter your account',
    plsPassword: 'Please enter your password',
    plsEmailC: 'Please enter the correct email address',
    plsEmail: 'Please enter your email address',
    pls6Password: 'Please enter 6-12 password',
    plsCharater: 'Please select your character',
    plsStatus: 'Please select the status',
    plsCompanyName: 'Please enter your company name',
    plsCompanyDes: 'Please enter the company profile',
  },
  accessSystem: {
    menjintongji: 'Access control statistics ',
    kaishiriqi: 'Start Time',
    jieshuriqi: 'End Time',
    chaxun: 'Search',
    yuangongtongxingtongji: 'Employee traffic statistics',
    tongxingrenshu: 'Pass people',
    tongxingrenci: 'Pass time',
    fangketongxingtongji: 'Visitor traffic statistics',
    heimingdanjujuetongji: 'Blacklist rejection statistics',
    renliuqushitongji: 'Flow trend statistics',
    zhi: 'To',
    chaxunshibai: 'Search failed',
    ren: '',
    ci: '',
    shezhi: 'Setting',
    shanchu: 'Delete',
    xinzeng: 'Add',
    tongshang: 'Ditto',
    jinchuleixing: 'Entry and exit type',
    qingxuanze: 'Please select',
    jin: 'In',
    chu: 'Out',
    queding: 'OK',
    tianjiashebei: 'Add device',
    shexiangji: 'Video camera',
    zhinengyingjian: 'Intelligent hardware',
    mingcheng: 'Name',
    caozuo: 'Operation',
    tianjia: 'Add',
    menjinshebei: 'Access control equipment',
    xiaofangkaimen: 'Fire door open',
    shebeimingcheng: 'Device name',
    leixing: 'Type',
    gongzuoshijian: 'Work time',
    dian: ' ',
    zhouyi: 'Mon',
    zhouer: 'Tue',
    zhousan: 'Wed',
    zhousi: 'Thu',
    zhouwu: 'Fri',
    zhouliu: 'Sat',
    zhouri: 'Sun',
    yuanchengkaimen: 'Open the door',
    yikaimen: 'Door opened',
    qingxuanzeshanchuxiang: 'Please select',
    shanchuchenggong: 'Successfully',
    shezhichenggong: 'Successfully',
    tianjiachenggong: 'Successfully',
    zhaoxiangji: 'Camera',
    qingxuanzeshezhixiang: 'Please select',
    meirishangxiansigeshijianduan: 'Daily limit of four time periods',
    //通行规则
    xiafashebei: 'Connect',
    quxiao: 'Cancel',
    tongxingguize: 'Pass rules',
    guizemingcheng: 'Rule name',
    shifouyunxutongxing: 'Allow to access',
    renyuanleixing: 'Person type',
    tongxingfangshi: 'Access mode',
    shengxiaoshebei: 'Effective device',
    guize: 'Rule',
    qingshurushebeimingcheng: 'Please enter the device name',
    qingshururenyuanleixing: 'Please enter the person type',
    qingxuanzetongxingfangshi: 'please select the access mode',
    xiafachenggong: 'Successfully',
    qingtianxiebitianxinxi: 'Please enter the neccessary message',
    shi: 'Yes',
    fou: 'No',
    xiugaichenggong: 'Successfully',
    bianji: 'Edit',
    guizemiaoshu: 'Rule description',
//告警
    gaojing: 'Alarm',
    gaojingshijian: 'Alarm time',
    gaojingleixing: 'Alarm type',
    qingshurugaojingdidian: 'Please enter the alarm time',
    piliangshanchu: 'Batch deletion',
    shijian: 'Time',
    weizhi: 'Location',
    guanbi: 'Turn off',

    gaojingdidian: 'Alarm location',
    zhuapaizhaopian: 'Snap photo',
    xingming: 'name',
    xiangqing: 'Detail',
    zuijinyizhou: 'Last week',
    zuijinyigeyue: 'Last month',
    zuijinsangeyue: 'Last quarter',
    shenfenzhenghao: 'ID',
    xuhao: 'Serial number',
    //通行记录
    tongxingjilu: 'Access record',
    renyuanxingming: 'Person name',
    renyuanbianhao: 'Person code',

    tongxingshijian: 'Access time',
    tongxingshebei: 'Access equipment',

    yanzhengjieguo: 'Validation results',
    jilushijianduan: 'Recording period',
    tongxingjieguo: 'Pass result',
    quanbu: 'All',
    tongguo: 'Pass',
    weitongguo: 'Failed',
    bianhao: 'Code',
    daochu: 'Export',
    shebei: 'Device',

    duibidafen: 'Contrast score',
    weizhiz: 'Unknown',
    daochuwenjian: 'Export.xlsx',
    //header
    kaolamenjin: 'Koala Smart Access Control System',
    tuichuxitong: 'Exit',
    menjinguanli: 'Access control',
    shouye: 'Home',
    menjinshebeiguanli: "Device management",
    qingxuanzerenyuanleixing: 'Please select the person type'
  }
}
