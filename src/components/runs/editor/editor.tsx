import { BACKEND_URL } from '@/src/utils/config';
import { getWordDocument, savePDFDocument, saveWordDocument } from '@/src/utils/requests';
import { StrictMode, use, useEffect, useRef } from 'react';
import {
    DocumentEditor,
    DocumentEditorContainerComponent, SfdtExport, Toolbar, DocumentEditorContainer, SpellChecker,
    WordExport,
    DocumentEditorComponent
} from '@syncfusion/ej2-react-documenteditor';
import   './editor.module.css';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { toast } from '@/hooks/use-toast';

DocumentEditorContainerComponent.Inject(Toolbar);
DocumentEditorContainerComponent.Inject(SpellChecker)
DocumentEditorContainerComponent.Inject(SfdtExport, WordExport)
// DocumentEditorContainerComponent.Inject()
export  function WordDocumentEditor({appId, runId}: {appId: string, runId: string}) {
    
    let container: DocumentEditorContainerComponent ;
    async function load(){
        const response = await getWordDocument(appId, runId, false)
        if(response.status === 200){
            setTimeout(() => {
                container.documentEditor.open(JSON.stringify(response.data))

            }, 3000)
            
            
        }
    }
    

    return (
        <>
            <button onClick={load}>Open Document From AWS S3 Bucket</button>
            <DocumentEditorContainerComponent  id="container" ref={(scope) => { container = scope; }} enableToolbar={true} enableSpellCheck={true} serviceUrl={"https://localhost:3000"} >
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
    let hostUrl: string = `https://${BACKEND_URL}/documenteditor/`;
    let container = useRef<DocumentEditorContainerComponent>(null);
    const documentState = useRef<string>(null);
    // if(container.current){
    //     const styles = `
    //     @import url('https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css');
    //     @import url('https://cdn.syncfusion.com/ej2/27.2.2/bootstrap5.css');
    //     .control-section {
    //       margin-top: 100px;
    //     }
    //   `;
      
    // }
    

    const onLoadDefault = async (): Promise<void> => {
        // tslint:disable
        const resp = await getWordDocument(appId, runId)
        
        
        let defaultDocument: object = resp.data 
        
        // tslint:enable
        container.current.documentEditor.open(JSON.stringify(defaultDocument));
        documentState.current = container.current.documentEditor.serialize();
        container.current.documentEditor.documentName = "Getting Started";
        container.current.onDocumentChange = (): void => {
            container.current.documentEditor.focusIn();
        };
        
    };
    const rendereComplete = async (): Promise<void> => {

        window.onbeforeunload = function () {

            if(container.current.documentEditor.serialize() !== documentState.current){
                return "Want to save your changes?";
            }
           
        };
        container.current.documentEditor.pageOutline = "#E0E0E0";
        container.current.documentEditor.acceptTab = true;
        container.current.documentEditor.resize();

        await onLoadDefault();
    };

    const save = async (): Promise<void> => {
        const data = container.current.documentEditor.serialize()
        const content = { content: data };
        documentState.current = data;
        const resp = await saveWordDocument(appId, runId, content);
        if(resp.status === 200){
            alert('Document Saved Successfully')
        }
        else{
            alert('Error Saving Document')
            return 
        }
    }

    const downloadPdf = async (): Promise<void> => {
        await container.current.documentEditor.saveAsBlob("Docx").then(async (blob: Blob) => {
            try {
                // Create a FormData object to send the file
                const formData = new FormData();
                formData.append("file", blob, "document.docx");
                for (let [key, value] of formData.entries()) {
                    console.log(`${key}:`, value);
                }
                // Replace 'YOUR_SERVER_ENDPOINT' with your actual server URL
                const resp = await savePDFDocument(formData);
                // downloading returned application/pdf blob
                console.log(resp.data)
                console.log('sent')
                const url = window.URL.createObjectURL(resp.data);
                const a = document.createElement("a");
                a.href = url;
                a.download = "Document.pdf";
                a.click();
                
                

                if (!resp.status) {
                    throw new Error(`Server responded with status ${resp.statusText}`);
                }

                console.log("File uploaded successfully");
            } catch (error) {
                console.error("Error uploading file:", error);
            }
        }).catch((error) => {
            console.error("Error saving document as Blob:", error);
        });
    }

    const downloadWord = async (): Promise<void> => {
        container.current.documentEditor.saveAsBlob("Docx").then((blob: Blob) => {
            const url: string = URL.createObjectURL(blob);

            const a: HTMLAnchorElement = document.createElement("a");
            a.href = url;
            a.download = "Document.docx";
            a.click();
        })
    }

    return (
        <div className='tw-flex-col tw-z-0'>
            <div className='tw-flex tw-my-2 tw-justify-end'>
                {/* {onClick = { save } } */}
                <Button onClick={save} className="tw-mx-2" variant='ghost' >Save</Button>
                <DropdownMenu >
                    <DropdownMenuTrigger><Button variant='outline'>Actions</Button></DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onClick={downloadPdf}>Export PDF</DropdownMenuItem>
                        <DropdownMenuItem onClick={downloadWord}>Export Word</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu >
            </div>
            
        <div className={'control-pane'}>
            <div className="control-section">
                <div id="documenteditor_titlebar" className="e-de-ctn-title"></div>
                <div id="documenteditor_container_body">
                    <DocumentEditorContainerComponent
                        
                        height='790px'
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

