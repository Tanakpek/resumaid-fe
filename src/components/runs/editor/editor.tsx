import { BACKEND_URL } from '@/src/utils/config';
import { getWordDocument } from '@/src/utils/requests';
import { StrictMode, use, useEffect, useRef } from 'react';
import {
    DocumentEditor,
    DocumentEditorContainerComponent, SfdtExport, Toolbar, DocumentEditorContainer,
    WordExport,
    DocumentEditorComponent
} from '@syncfusion/ej2-react-documenteditor';
import styles from './editor.module.css';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
DocumentEditorContainerComponent.Inject(Toolbar);
// DocumentEditorContainerComponent.Inject(SfdtExport, WordExport)
export  function WordDocumentEditor({appId, runId}: {appId: string, runId: string}) {
    
    let container: DocumentEditorContainerComponent ;
    async function load(){
        const response = await getWordDocument(appId, runId)
        if(response.status === 200){
            setTimeout(() => {
                container.documentEditor.open(JSON.stringify(response.data))

            }, 3000)
            
            
        }
    }
    

    return (
        <>
            <button onClick={load}>Open Document From AWS S3 Bucket</button>
            <DocumentEditorContainerComponent  id="container" ref={(scope) => { container = scope; }} enableToolbar={true} serviceUrl={"https://localhost:3000"} >
            <h2>Syncfusion React Document Editor Component</h2>
            </DocumentEditorContainerComponent>
        </>
    )
}

DocumentEditorContainerComponent.Inject(Toolbar);
// tslint:disable:max-line-length
export const Default = ({appId, runId}) => {
    useEffect(() => {
        rendereComplete();
    }, []);
    let hostUrl: string =
        "https://services.syncfusion.com/react/production/api/documenteditor/";
    let container = useRef<DocumentEditorContainerComponent>(null);

    const onLoadDefault = async (): Promise<void> => {
        // tslint:disable
        const resp = await getWordDocument(appId, runId)
        
        console.log(resp.data)
        let defaultDocument: object = resp.data 
        
        // tslint:enable
        container.current.documentEditor.open(JSON.stringify(defaultDocument));
        container.current.documentEditor.documentName = "Getting Started";
        container.current.onDocumentChange = (): void => {
            container.current.documentEditor.focusIn();
        };
    };
    const rendereComplete = async (): Promise<void> => {
        window.onbeforeunload = function () {
            return "Want to save your changes?";
        };
        container.current.documentEditor.pageOutline = "#E0E0E0";
        container.current.documentEditor.acceptTab = true;
        container.current.documentEditor.resize();

        await onLoadDefault();
    };
    return (
        <div className='bs-sync'>
        <div className={styles['control-pane']}>
            <div className="control-section">
                <div id="documenteditor_titlebar" className="e-de-ctn-title"></div>
                <div id="documenteditor_container_body">
                    <DocumentEditorContainerComponent
                        id="container"
                        ref={container}
                        style={{ display: "block" }}

                        serviceUrl={hostUrl}
                        enableToolbar={true}
                        locale="en-US"
                    />
                </div>
            </div>
        </div>
        </div>
    );
}

