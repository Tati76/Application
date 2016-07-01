import {mount} from 'react-mounter';

FlowRouter.route('/:language/:index', {  
  action(params, queryParams) {
   mount(MainLayout, { content: <Home language={params.language} index={params.index}/>});
  }
});

FlowRouter.route('/:language/:index/SeeBoxes', {  
  action(params, queryParams) {
   mount(MainLayout, { content: <SeeBoxes language={params.language} index={params.index}/>});
  }
});

FlowRouter.route('/:language/:index/SeeBoxes/:id', {  
  action(params, queryParams) {
   mount(MainLayout, { content: <BoxContentSelectedBox language={params.language} index={params.index} boxId={params.id}/>});
  }
});

FlowRouter.route('/:language/:index/SeeBoxes/:id/AddContent', {  
  action(params, queryParams) {
   mount(MainLayout, { content: <AddContentToBox language={params.language} index={params.index} boxId={params.id}/>});
  }
});

FlowRouter.route('/:language/:index/Search', {  
  action(params, queryParams) {
   mount(MainLayout, { content: <SearchPage language={params.language} index={params.index}/>});
  }
});

FlowRouter.route('/:language/:index/:id/:boxIndex/pageQr', {  
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

FlowRouter.route('/:language/:index/:id/:boxIndex/BoxInfo', {  
  action(params, queryParams) {
	  console.log("ROUTING : ");
    mount(MainLayout, { content: <BoxInfo language={params.language} index={params.index} id={params.id} boxIndex={params.boxIndex}/>});
  }
});