import jsPDF from 'jspdf';
import Button from 'react-bootstrap/Button';
import logo from '../../assets/logo.png';
import { format } from 'date-fns';

const Pdf = ({ note }) => {
    const formatBrDate = (date) => {
        return format(new Date(date), "dd/MM/yyyy HH:mm:ss");
    };

    const generateFieldDescription = (fieldName, fieldDescriptions) => {
        return fieldDescriptions[fieldName] || fieldName;
    };

    const addPageHeader = (doc) => {
        doc.setFillColor(173, 216, 230);
        doc.rect(0, 0, doc.internal.pageSize.width, 20, 'F');
    };

    const addLogo = (doc) => {
        const logoWidth = 27.54;
        const logoHeight = 9.28;
        const logoXPosition = doc.internal.pageSize.width - logoWidth - 8;
        const logoYPosition = 4.5;
        doc.addImage(logo, 'PNG', logoXPosition, logoYPosition, logoWidth, logoHeight);
    };

    const addTitle = (doc, note) => {
        doc.setFontSize(16);
        doc.setFont("helvetica", "bold");
        const title = `Note ${note.idChamado}`;
        const titleWidth = doc.getStringUnitWidth(title) * doc.internal.getFontSize() / doc.internal.scaleFactor;
        const pageWidth = doc.internal.pageSize.width;
        const xPosition = (pageWidth - titleWidth) / 2;
        const Positiony = 13;
        doc.text(title, xPosition, Positiony);
    };


    const handleGeneratePDF = () => {
        const doc = new jsPDF('A4');

        // Mapeamento de descrições personalizadas para campos
        const fieldDescriptions = {
            idChamado: "ID do Chamado",
            titulo: "Título",
            modulo: "Módulo/Submódulo",
            cliente: "Empresa",
            consultor: "Consultor responsável",
            solicitacao: "Solicitação",
            prioridade: "Prioridade",
            origemSolicitacao: "Origem da Solicitação de Melhoria",
            processoNegocio: "Processo de Negócio",
            descricaoFuncional: "Descrição Funcional da Melhoria",
            referenciaFt: "Referência a Especificação Funcional e Técnica",
            cutover: "Plano de Cutover",
            definicaoProblema: "Definição do Problema",
            causaProblema: "Possíveis Causas do Problema",
            alternativaSolucao: "Alternativas de Solução Possíveis",
            pedidoMelhoria: "Pedidos de Melhorias Abertas Após Análise",
            reproducaoProblema: "Reprodução do Problema",
            sintomas: "Sintomas",
            reproducaoProcesso: "Reprodução do Processo",
            esclarecimentoDuvida: "Esclarecimento da Dúvida",
            duvida: "Dúvida",
            reproducaoErro: "Reprodução do Erro",
            descricaoSolucao: "Descrição da Solução",
            configuracoesExecutadas: "Configurações Executadas",
            objetosAbap: "Objetos ABAP criados/alterados",
            request: "Request",
            termoBusca: "Termos de Busca / Transações Envolvidas / Nº da Mensagem",
            createdAt: "Data de criação",
            updatedAt: "Data de atualização",
            __v: "Versão",
            // Adicione mais campos e descrições personalizadas conforme necessário
        };

        addPageHeader(doc);
        addLogo(doc);
        addTitle(doc, note);

        const excludedFields = ['_id', 'userId', 'userName', 'history'];
        let yPosition = 30;
        const fieldSpacing = 10;
        let pageCount = 1;



        Object.entries(note).forEach(([fieldName, fieldValue]) => {
            if (fieldValue && !excludedFields.includes(fieldName)) {
                doc.setFontSize(11);
                doc.setFont("helvetica", "bold");
                const fieldDescription = generateFieldDescription(fieldName, fieldDescriptions);
                doc.text(`${fieldDescription}:`, 10, yPosition, {
                    top: 2 * doc.internal.getFontSize() / doc.internal.scaleFactor,
                });
                yPosition += fieldSpacing;
                doc.setFont("helvetica", "normal");

                if (fieldName === 'createdAt' || fieldName === 'updatedAt') {
                    fieldValue = formatBrDate(fieldValue);
                }

                const textLines = doc.splitTextToSize(fieldValue.toString(), 190);
                for (const textLine of textLines) {
                    doc.text(textLine, 10, yPosition);
                    yPosition += fieldSpacing;
                }


                if (yPosition > doc.internal.pageSize.height - 50) {
                    doc.addPage();
                    yPosition = 30;
                    pageCount++;
                }
            }
        });

        if (pageCount === doc.getNumberOfPages()) {
            doc.setFontSize(10);
            const footerText = "Fusion Consultoria Ltda";
            doc.setFillColor(173, 216, 230);
            const footerWidth = doc.getStringUnitWidth(footerText) * doc.internal.getFontSize() / doc.internal.scaleFactor;
            const footerXPosition = (doc.internal.pageSize.width - footerWidth) / 2;
            const footerYPosition = doc.internal.pageSize.height - 9;
            doc.rect(0, doc.internal.pageSize.height - 20, doc.internal.pageSize.width, 20, 'F');
            doc.text(footerText, footerXPosition, footerYPosition);
        }

        doc.save(`Note_${note.idChamado}.pdf`);
    };

    return (
        <div>
            <Button variant="warning" size="lg" id='gerar' onClick={handleGeneratePDF} style={{ width: '100%' }}>
                Gerar PDF
            </Button>
        </div>
    );
};

export default Pdf;