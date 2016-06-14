import {mount} from 'react-mounter';

FlowRouter.route('/:language/:index', {  
  action(params, queryParams) {
   mount(MainLayout, { content: <Home language={params.language} index={params.index}/>});
  }
});

FlowRouter.route('/:language/:index/:id/pageQr', {  
  action(params, queryParams) {
    console.log("qr");
    mount(MainLayout, { content: <QRPage language={params.language} index={params.index} id={params.id}/>});
  }
});

FlowRouter.route('/', {  
  action() {
   FlowRouter.go('/Norsk/0');
  }
});

FlowRouter.route('/:language/:index/go', {  
  action(params, queryParams) {
    mount(MainLayout, { content: <Go language={params.language} index={params.index}/>});
  }
});

FlowRouter.route('/:language/:index/InholdInfo', {  
  action(params, queryParams) {
	  console.log("ROUTING : ");
    mount(MainLayout, { content: <InholdInfo language={params.language} index={params.index}/>});
  }
});

FlowRouter.route('/:language/:index/:id/BoxInfo', {  
  action(params, queryParams) {
	  console.log("ROUTING : ");
    mount(MainLayout, { content: <BoxInfo language={params.language} index={params.index} id={params.id}/>});
  }
});