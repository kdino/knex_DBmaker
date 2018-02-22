module.exports.up = async db => {
    // user_login - user's email address as ID, pw_hash, verified
    await db.schema.createTable('user_login', table => {
        table.increments('id').notNullable().primary();
        table.string('email', 100).notNullable();
        table.string('password_hash', 128).notNullable();
        table.boolean('verified').notNullable().defaultTo(false);
        table.timestamps(false, true);
        table.unique(['email', 'verified']); //why verified?
    });

    // profile(general)
    await db.schema.createTable('profile_general', table => {
        table.integer('id').notNullable().unique();
        table.integer('user_id').unsigned();
        table.foreign('user_id').references('id').inTable('user_login');
        table.string('name', 50).notNullable();
        table.enu('role', [
            'Founder', 'Mentor', 'Investor'
        ]).notNullable();
        table.string('image_url', 200); //blob ??
        table.string('location', 100);
        table.specificType('sns', db.raw('text[]'));
        table.primary(['id', 'user_id']);
    });

    // profile_founder
    await db.schema.createTable('profile_founder', table => {
        table.integer('id').notNullable().unique();
        table.integer('profile_general_id').unsigned();
        table.foreign('id').references('id').inTable('profile_general');
        table.integer('year_experience', 50).notNullable();
        table.enum('education', [
            'Pre-Undergrade or Less', 'Bachelor', 'Master', 'Ph.D or More'
        ]).notNullable();
        table.boolean('previous_experience').notNullable().defaultTo(false);
        table.integer('successful_exit', 50).notNullable();
        table.integer('company_experience', 50).notNullable();
        table.boolean('award').notNullable().defaultTo(false);
        table.boolean('patent').notNullable().defaultTo(false);
        table.text('introduction').notNullable();
        table.enum('main_value', [
            'People', 'Quality', 'Market', 'Product', 'Technology', 'Social Contribution'
        ]).notNullable();
        table.primary(['id', 'profile_general_id']);
    });

    // company
    await db.schema.createTable('company', table => {
        table.increments('id').notNullable().primary();
        table.string('name', 50).notNullable();
        table.enum('field', [
            'Advertising', 'Advertising Platforms', 'Aerospace', 'Analytics', 'Android', 'Apps', 'Art', 'Artificial Intelligence', 'Association', 'Automotive',
            'B2B', 'Banking', 'Beauty', 'Big Data', 'Biotechnology', 'Blogging Platforms', 'Brand Marketing', 'Broadcasting', 'Business Development', 'Business Intelligence',
            'Cloud Computing', 'Communities', 'Computer', 'Construction', 'Consulting', 'Consumer Electronics', 'Content', 'CRM', 'Customer Service', 'Cyber Security',
            'Data Visualization', 'Database', 'Delivery', 'Developer APIs', 'Developer Platform', 'Developer Tools', 'Digital Entertainment', 'Digital Marketing', 'Digital Media', 'Drones',
            'E-Commerce', 'E-Learning', 'EdTech', 'Education', 'Electronics', 'Employment', 'Energy', 'Enterprise Software', 'Event Management', 'Events',
            'Fashion', 'File Sharing', 'Film', 'Finance', 'Financial Services', 'FinTech', 'Fitness', 'Food and Beverage', 'Food Processing', 'Furniture',
            'Gambling', 'Gamification', 'Gaming', 'Generation Y', 'Generation Z', 'Genetics', 'Geospatial', 'Gift', 'Gift Card', 'Government', 'Graphic Design', 'GreenTech',
            'Hardware', 'Health Care', 'Health Diagnostics', 'Higher Education', 'Home Decor', 'Home Renovation', 'Hospital', 'Hospitality', 'Hotel', 'Human Resources',
            'ncubators', 'Industrial', 'Information Services', 'Information Technology', 'Infrastructure', 'Innovation Management', 'Insurance', 'Internet', 'Internet of Things',
            'Janitorial Service', 'Jewelry', 'Journalism', 'Knowledge Management',
            'Language Learning', 'Lead Generation', 'Legal', 'Leisure', 'Life Science', 'Lifestyle', 'Local', 'Location Based Services', 'Logistics', 'Loyalty Programs',
            'Manufacturing', 'Marketing', 'Marketplace', 'Media and Entertainment', 'Medical', 'Medical Device', 'Messaging', 'Mobile', 'Mobile Apps', 'Music',
            'Nanotechnology', 'National Security', 'Natural Language Processing', 'Natural Resources', 'Navigation', 'Network Hardware', 'Network Security', 'News', 'Non Profit', 'Nutrition',
            'Oil and Gas', 'Online Auctions', 'Online Games', 'Online Portals', 'Open Source', 'Optical Communication', 'Organic', 'Organic Food', 'Outdoors', 'Outsourcing',
            'Payments', 'Pharmaceutical', 'Photography', 'Predictive Analytics', 'Printing', 'Product Design', 'Professional Services', 'Project Management', 'Public Relations', 'Publishing',
            'Q&A', 'QR Codes', 'Quality Assurance', 'Quantified Self',
            'Real Estate', 'Real Estate Investment', 'Real Time', 'Recruiting', 'Renewable Energy', 'Restaurants', 'Retail', 'Retail Technology', 'Risk Management', 'Robotics',
            'Sales and Marketing', 'Science and Engineering', 'Software', 'Sports', 'Sustainability',
            'Telecommunications', 'Test and Measurement', 'Therapeutics', 'Ticketing', 'Tourism', 'Trading Platform', 'Training', 'Transportation', 'Travel', 'Tutoring',
            'Ultimate Frisbee', 'Underserved Children', 'Unified Communications', 'Universities', 'Usability Testing', 'UX Design',
            'Venture Capital', 'Video', 'Video Chat', 'Video Conferencing', 'Video Games', 'Video on Demand', 'Video Streaming', 'Virtual Reality', 'Virtualization', 'VoIP',
            'Water', 'Wearables', 'Web Apps', 'Web Browsers', 'Web Design', 'Web Development', 'Web Hosting', 'Wellness', 'Wholesale', 'Wireless', 'Xbox', 'Young Adualts'
        ]).notNullable();
        table.enum('stage', [
            'Concept Only', 'Pre-seed Capital', 'Seed Capital',
            'Series A (2M - 5M)', 'Series B (6M ~ 10M)', 'Series C and following rounds'
        ]).notNullable();
        table.boolean('incorporated').notNullable().defaultTo(false);
        table.integer('number_of_employees');
        table.string('location', 100).notNullable();
        table.enu('support', [
            'Investment', 'Promotion', 'Marketing', 'Place', 'Development', 'Capital (Real Estate or Cash)', 'Content', 'Data / Information', 'Technology / Platform',
            'Goods / Food / Widgets (Re-sellers)', 'Goods / Food / Widgets (Producers)', 'Hard Science (Biotect, Pharma, AI, etc)', 'Network or Community',
            'Non-physical Direct to Consumer (In-app Purchases, Freemium, etc)', 'Physical Direct to Consumer (Monthly Deliveries, etc)',
            'Services (Healthcare, Professional Services, Legal Services)', 'Others'
        ]).notNullable();
        table.enu('investor_type', [
            'Personal Investment', 'Representing a Family Office', 'Representing a Corporate', 'Representing a Government',
            'Representing a Fund', 'Representing an Institution', 'Representing an Accelerator', 'Legal Counsel'
        ]).notNullable();
        table.enum('main_value', [
            'People', 'Quality', 'Market', 'Product', 'Technology', 'Social Contribution'
        ]).notNullable();
        table.string('pitch_video_url', 500);
        table.integer('company_score', 50).notNullable();
    });

    // company_member
    await db.schema.createTable('company_member', table => {
        table.increments('id').notNullable().primary();
        table.integer('user_id').notNullable().references('id').inTable('user_login').onDelete('CASCADE').onUpdate('CASCADE');
        table.integer('company_id').notNullable().references('id').inTable('company').onDelete('CASCADE').onUpdate('CASCADE');
    });

    // question
    await db.schema.createTable('question', table => {
        table.increments('id').notNullable().primary();
        table.integer('category').notNullable();
        // n(category) + nn(#) + n(sub question)
        //1000:team, 2000:market, 3000:company, 4000:finance

        table.text('text').notNullable();
        table.enu('answer_type', [
            'Dropdown', 'Input_Number', 'Input_Text', 'Textarea', 'Radio', 'Multiselection'
        ]).notNullable();
        table.unique(['category']);
    });

    // answer
    await db.schema.createTable('answer', table => {
        table.increments('id').notNullable().primary();
        table.integer('company_id').notNullable().references('id').inTable('company').onDelete('CASCADE').onUpdate('CASCADE');
        table.integer('question_id').notNullable().references('id').inTable('question').onDelete('CASCADE').onUpdate('CASCADE');
        table.text('text');
        table.enu('status', [
            'Waiting', 'Improve', 'Not Bad', 'Good'
        ]).notNullable();
        table.integer('score_for_answer', 50).notNullable();
    });

    // category_score
    await db.schema.createTable('category_score', table => {
        table.increments('id').notNullable().primary();
        table.integer('company_id').notNullable().references('id').inTable('company').onDelete('CASCADE').onUpdate('CASCADE');
        table.integer('category').notNullable(); //same as question.category?
        table.integer('score', 50).notNullable();
    });

    // Advice
    await db.schema.createTable('advice', table => {
        table.increments('id').notNullable().primary();
        table.integer('question_id').notNullable().references('id').inTable('question').onDelete('CASCADE').onUpdate('CASCADE');
        table.text('text').notNullable();
        table.enu('score_threshold', [
            '0', '50', '80', '100'
        ]).notNullable();
    });


    /********************************* enum table **********************************/
    await db.schema.createTable('enum_role', table => {
        table.increments('id').notNullable().primary();
        table.string('role').notNullable();
    });
    db('enum_role').insert({role: 'Founder'});
    db('enum_role').insert({role: 'Mentor'});
    db('enum_role').insert({role: 'Investor'});

    await db.schema.createTable('enum_education', table => {
        table.increments('id').notNullable().primary();
        table.string('education').notNullable();
    });
    db('enum_education').insert({education: 'Pre-Undergrade or Less'});
    db('enum_education').insert({education: 'Bachelor'});
    db('enum_education').insert({education: 'Master'});
    db('enum_education').insert({education: 'Ph.D or More'});

    await db.schema.createTable('enum_main_value', table => {
        table.increments('id').notNullable().primary();
        table.string('main_value').notNullable();
    });
    db('enum_main_value').insert({main_value: 'People'});
    db('enum_main_value').insert({main_value: 'Quality'});
    db('enum_main_value').insert({main_value: 'Market'});
    db('enum_main_value').insert({main_value: 'Product'});
    db('enum_main_value').insert({main_value: 'Technology'});
    db('enum_main_value').insert({main_value: 'Social Contribution'});

    await db.schema.createTable('enum_field', table => {
        table.increments('id').notNullable().primary();
        table.string('field').notNullable();
    });
    db('enum_field').insert({field: 'Advertising'});
    db('enum_field').insert({field: 'Advertising Platforms'});
    db('enum_field').insert({field: 'Aerospace'});
    db('enum_field').insert({field: 'Analytics'});

    await db.schema.createTable('enum_stage', table => {
        table.increments('id').notNullable().primary();
        table.string('stage').notNullable();
    });
    db('enum_stage').insert({stage: 'Concept Only'});
    db('enum_stage').insert({stage: 'Pre-seed Capital'});
    db('enum_stage').insert({stage: 'Seed Capital'});

    await db.schema.createTable('enum_support', table => {
        table.increments('id').notNullable().primary();
        table.string('support').notNullable();
    });
    db('enum_support').insert({support: 'Investment'});
    db('enum_support').insert({support: 'Promotion'});
    db('enum_support').insert({support: 'Marketing'});

    await db.schema.createTable('enum_investor_type', table => {
        table.increments('id').notNullable().primary();
        table.string('investor_type').notNullable();
    });
    db('enum_investor_type').insert({investor_type: 'Personal Investment'});
    db('enum_investor_type').insert({investor_type: 'Representing a Family Office'});
    db('enum_investor_type').insert({investor_type: 'Representing a Corporate'});

    await db.schema.createTable('enum_answer_type', table => {
        table.increments('id').notNullable().primary();
        table.string('answer_type').notNullable();
    });
    db('enum_answer_type').insert({answer_type: 'Dropdown'});
    db('enum_answer_type').insert({answer_type: 'Input_Number'});
    db('enum_answer_type').insert({answer_type: 'Input_Text'});

    await db.schema.createTable('enum_status', table => {
        table.increments('id').notNullable().primary();
        table.string('status').notNullable();
    });
    db('enum_status').insert({status: 'Waiting'});
    db('enum_status').insert({status: 'Improve'});
    db('enum_status').insert({status: 'Not Bad'});

    await db.schema.createTable('enum_score_threshold', table => {
        table.increments('id').notNullable().primary();
        table.integer('score_threshold').notNullable();
    });
    db('enum_score_threshold').insert({score_threshold: 0});
    db('enum_score_threshold').insert({score_threshold: 50});
    db('enum_score_threshold').insert({score_threshold: 80});
};

module.exports.down = async db => {
    await db.schema.dropTableIfExists('user_login');
    await db.schema.dropTableIfExists('profile_general');
    await db.schema.dropTableIfExists('profile_founder');
    await db.schema.dropTableIfExists('company');
    await db.schema.dropTableIfExists('company_member');
    await db.schema.dropTableIfExists('question');
    await db.schema.dropTableIfExists('answer');
    await db.schema.dropTableIfExists('category_score');
    await db.schema.dropTableIfExists('advice');

    await db.schema.dropTableIfExists('enum_role');
    await db.schema.dropTableIfExists('enum_education');
    await db.schema.dropTableIfExists('enum_main_value');
    await db.schema.dropTableIfExists('enum_field');
    await db.schema.dropTableIfExists('enum_stage');
    await db.schema.dropTableIfExists('enum_support');
    await db.schema.dropTableIfExists('enum_investor_type');
    await db.schema.dropTableIfExists('enum_answer_type');
    await db.schema.dropTableIfExists('enum_status');
    await db.schema.dropTableIfExists('enum_score_threshold');
};

module.exports.configuration = { transaction: true };


/* SQL
 INSERT INTO user_login (email, password_hash, verified) VALUES ('eccsicilia@naver.com', 'boot1up', 't');
 INSERT INTO user_login (email, password_hash, verified) VALUES ('hakwon9439@gmail.com', 'boot2up', 't');
 INSERT INTO user_login (email, password_hash, verified) VALUES ('example@example.com', 'boot3up', 'f');

 INSERT INTO profile_general (id, user_id, name, role) VALUES (1, 1, 'Kwon', 'Founder');
 INSERT INTO profile_general (id, user_id, name, role) VALUES (2, 2, 'Hyun', 'Mentor');
 INSERT INTO profile_general (id, user_id, name, role) VALUES (3, 3, 'Ah', 'Founder');

 INSERT INTO profile_founder (id, profile_general_id, year_experience, education, previous_experience, successful_exit, company_experience, award, patent, introduction, main_value) VALUES (1, 1, 10, 'Bachelor', 'f', 0, 0, 't', 'f', 'Hi 1', 'People');
 INSERT INTO profile_founder (id, profile_general_id,year_experience, education, previous_experience, successful_exit, company_experience, award, patent, introduction, main_value) VALUES (2, 2, 20, 'Pre-Undergrade or Less', 't', 2, 1, 't', 't', 'Hi 2', 'Social Contribution');
 INSERT INTO profile_founder (id, profile_general_id,year_experience, education, previous_experience, successful_exit, company_experience, award, patent, introduction, main_value) VALUES (3, 3, 5, 'Master', 'f', 0, 0, 'f', 'f', 'Hi 3', 'People');

 INSERT INTO company (name, field, stage, incorporated, location, support, investor_type, main_value, company_score) VALUES ('Who I am', 'Advertising', 'Series B (6M ~ 10M)', 'f', 'CA', 'Capital (Real Estate or Cash)', 'Representing a Corporate', 'Market', 68);
 INSERT INTO company (name, field, stage, incorporated, location, support, investor_type, main_value, company_score) VALUES ('Where am I', 'Journalism', 'Pre-seed Capital', 'f', 'LA', 'Promotion', 'Representing an Accelerator', 'Quality', 25);
 INSERT INTO company (name, field, stage, incorporated, location, support, investor_type, main_value, company_score) VALUES ('OMG Brain', 'Artificial Intelligence', 'Series A (2M - 5M)', 't', 'CA', 'Investment', 'Personal Investment', 'Technology', 50);

 INSERT INTO company_member (user_id, company_id) VALUES (1, 1);
 INSERT INTO company_member (user_id, company_id) VALUES (2, 2);
 INSERT INTO company_member (user_id, company_id) VALUES (3, 1);

 INSERT INTO question (category, text, answer_type) VALUES (1001, 'Do you have any other key team members?', 'Input_Number');
 INSERT INTO question (category, text, answer_type) VALUES (2010, 'What is your target market?', 'Input_Text');
 INSERT INTO question (category, text, answer_type) VALUES (2011, 'What is the market size?', 'Dropdown');

 INSERT INTO answer (company_id, question_id, text, status, score_for_answer) VALUES (1, 1, 'Ki Lee', 'Waiting', 0);
 INSERT INTO answer (company_id, question_id, text, status, score_for_answer) VALUES (1, 3, '400', 'Improve', 20);
 INSERT INTO answer (company_id, question_id, text, status, score_for_answer) VALUES (2, 1, 'Inuck', 'Not Bad', 75);

 INSERT INTO category_score (company_id, category, score) VALUES (1, 1000, 70);
 INSERT INTO category_score (company_id, category, score) VALUES (1, 2000, 30);
 INSERT INTO category_score (company_id, category, score) VALUES (2, 1000, 40);

 INSERT INTO Advice (question_id, text, score_threshold) VALUES (1, 'Make other key team members!', 50);
 INSERT INTO Advice (question_id, text, score_threshold) VALUES (1, 'hororrorrolllooloolooro', 80);
 INSERT INTO Advice (question_id, text, score_threshold) VALUES (1, 'Best key member ever', 100);

 INSERT INTO enum_role (role) VALUES ('Founder');
 INSERT INTO enum_role (role) VALUES ('Mentor');
 INSERT INTO enum_role (role) VALUES ('Investor');

 INSERT INTO enum_education (education) VALUES ('Pre-Undergrade or Less');
 INSERT INTO enum_education (education) VALUES ('Bachelor');
 INSERT INTO enum_education (education) VALUES ('Master');

 INSERT INTO enum_main_value (main_value) VALUES ('People');
 INSERT INTO enum_main_value (main_value) VALUES ('Quality');
 INSERT INTO enum_main_value (main_value) VALUES ('Market');

 INSERT INTO enum_field (field) VALUES ('Advertising');
 INSERT INTO enum_field (field) VALUES ('Advertising Platforms');
 INSERT INTO enum_field (field) VALUES ('Aerospace');

 INSERT INTO enum_stage (stage) VALUES ('Concept Only');
 INSERT INTO enum_stage (stage) VALUES ('Pre-seed Capital');
 INSERT INTO enum_stage (stage) VALUES ('Seed Capital');

 INSERT INTO enum_support (support) VALUES ('Investment');
 INSERT INTO enum_support (support) VALUES ('Promotion');
 INSERT INTO enum_support (support) VALUES ('Marketing');

 INSERT INTO enum_investor_type (investor_type) VALUES ('Personal Investment');
 INSERT INTO enum_investor_type (investor_type) VALUES ('Representing a Family Office');
 INSERT INTO enum_investor_type (investor_type) VALUES ('Representing a Corporate');

 INSERT INTO enum_answer_type (answer_type) VALUES ('Dropdown');
 INSERT INTO enum_answer_type (answer_type) VALUES ('Input_Number');
 INSERT INTO enum_answer_type (answer_type) VALUES ('Input_Text');

 INSERT INTO enum_status (status) VALUES ('Waiting');
 INSERT INTO enum_status (status) VALUES ('Improve');
 INSERT INTO enum_status (status) VALUES ('Not Bad');

 INSERT INTO enum_score_threshold (score_threshold) VALUES (0);
 INSERT INTO enum_score_threshold (score_threshold) VALUES (50);
 INSERT INTO enum_score_threshold (score_threshold) VALUES (80);
 */