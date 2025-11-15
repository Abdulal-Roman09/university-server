  /*
    const queryObj = { ...query }; // copying req.query object so that we can mutate the copy object 
     
    let searchTerm = '';   // SET DEFAULT VALUE 
  
    // IF searchTerm  IS GIVEN SET IT
    if (query?.searchTerm) {
      searchTerm = query?.searchTerm as string; 
    }
  
    
   // HOW OUR FORMAT SHOULD BE FOR PARTIAL MATCH  : 
    { email: { $regex : query.searchTerm , $options: i}}
    { presentAddress: { $regex : query.searchTerm , $options: i}}
    { 'name.firstName': { $regex : query.searchTerm , $options: i}}
  
    
    // WE ARE DYNAMICALLY DOING IT USING LOOP
     const searchQuery = Student.find({
       $or: studentSearchableFields.map((field) => ({
         [field]: { $regex: searchTerm, $options: 'i' },
      })),
     });
  
    
     // FILTERING fUNCTIONALITY:
    
    const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
     excludeFields.forEach((el) => delete queryObj[el]);  // DELETING THE FIELDS SO THAT IT CAN'T MATCH OR FILTER EXACTLY
  
    const filterQuery = searchQuery
      .find(queryObj)
      .populate('admissionSemester')
      .populate({
        path: 'academicDepartment',
        populate: {
          path: 'academicFaculty',
        },
      });
  
   
    // SORTING FUNCTIONALITY:
    
    let sort = '-createdAt'; // SET DEFAULT VALUE 
   
   // IF sort  IS GIVEN SET IT
    
     if (query.sort) {
      sort = query.sort as string;
    }
  
     const sortQuery = filterQuery.sort(sort);
  
  
     // PAGINATION FUNCTIONALITY:
  
     let page = 1; // SET DEFAULT VALUE FOR PAGE 
     let limit = 1; // SET DEFAULT VALUE FOR LIMIT 
     let skip = 0; // SET DEFAULT VALUE FOR SKIP
  
  
    // IF limit IS GIVEN SET IT
    
    if (query.limit) {
      limit = Number(query.limit);
    }
  
    // IF page IS GIVEN SET IT
  
    if (query.page) {
      page = Number(query.page);
      skip = (page - 1) * limit;
    }
  
    const paginateQuery = sortQuery.skip(skip);
  
    const limitQuery = paginateQuery.limit(limit);
  
    
    
    // FIELDS LIMITING FUNCTIONALITY:
  
    // HOW OUR FORMAT SHOULD BE FOR PARTIAL MATCH 
  
    fields: 'name,email'; // WE ARE ACCEPTING FROM REQUEST
    fields: 'name email'; // HOW IT SHOULD BE 
  
    let fields = '-__v'; // SET DEFAULT VALUE
  
    if (query.fields) {
      fields = (query.fields as string).split(',').join(' ');
  
    }
  
    const fieldQuery = await limitQuery.select(fields);
  
    return fieldQuery;
  
    */