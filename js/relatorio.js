    document.getElementById('nascenteForm').addEventListener('submit', function(event) {
        event.preventDefault();

    
        const nome = document.getElementById('nome').value;
        const localizacao = document.getElementById('localizacao').value;
        const descricao = document.getElementById('descricao').value;
        const data = document.getElementById("data").value;
        const uf = document.getElementById("uf").value;
        const endereco = document.getElementById("endereco").value;
        const municipio = document.getElementById("municipio").value;
        const coliformes = document.getElementById("coliformes").value;
        const oxigenio = document.getElementById("oxigenio").value;
        const ph = document.getElementById("ph").value;
        const temperatura = document.getElementById("temperatura").value;
        const temperaturaAr = document.getElementById("temperaturaAr").value;
        const bioquimica = document.getElementById("bioquimica").value;
        const fosforo = document.getElementById("fosforo").value;
        const nitrato = document.getElementById("nitrato").value;
        const nitrito = document.getElementById("nitrito").value;
        const nitrogenio = document.getElementById("nitrogenio").value;
        const nitrogenioTotal = document.getElementById("nitrogenioTotal").value;
        const solidos = document.getElementById("solidos").value;
        const turbidez = document.getElementById("turbidez").value;
        

    
        
        // Texto padrão 
        let textoPadrao = `RELATÓRIO \n \n \n \n Este relatório apresenta uma análise detalhada da qualidade das águas do(a) ${nome}, situada no bairro ${endereco}, ${municipio}/${uf}. Os resultados das amostragens de água, coletadas em ${data}, indicam que a maioria dos pontos monitorados não atende aos padrões estabelecidos para águas de classe 2, segundo a Resolução CONAMA 357/2005 e a Deliberação Normativa Conjunta COPAM nº 01/2008.

        Os pontos de coleta analisados abrangem seis locais distintos, onde foram monitorados parâmetros físico-químicos e microbiológicos. Destacam-se os altos índices de coliformes totais e Escherichia coli, que são indicadores da contaminação fecal recente e apontam a presença de esgotamento doméstico, especialmente nos pontos 03 e 05. Esses locais estão próximos a edificações e possíveis despejos de esgoto, apresentando os piores resultados, com coliformes totais acima de 24.000 NMP/100mL e E.coli acima de 10.000 NMP/100mL.

        Parâmetros físico-químicos, como demanda bioquímica de oxigênio (DBO), fósforo total e nitrogênio amoniacal, foram analisados e comparados com os padrões de classe 2. O índice de qualidade da água (IQA) revelou que o ponto 05 apresenta qualidade "Ruim", enquanto os demais pontos variam entre "Médio" e "Aceitável", com IQAs entre 45 e 64, dependendo da metodologia utilizada (IGAM ou CETESB).

        A conclusão do estudo sugere que o curso d'água está impactado por atividades humanas, especialmente pelo lançamento de esgoto doméstico, comprometendo a sua qualidade e inviabilizando o uso recreativo primário seguro, conforme a legislação vigente. Recomenda-se a continuidade do monitoramento e a realização de novas análises durante o período chuvoso para avaliar melhor as condições de autodepuração do rio.

        Em caso de dúvidas ou para mais informações, entre em contato com as técnicas responsáveis, Juliana Magno e Flávia Gomes, pelos telefones fornecidos no relatório. \n
        Coliformes totais: ${coliformes}\n
        Oxigênio dissolvido: ${oxigenio}\n
        pH: ${ph}\n
        Temperatura da água: ${temperatura}\n
        Temperatura do ar:  ${temperaturaAr}\n
        Demanda Bioquímica de Oxigênio:  ${bioquimica}\n
        Fósforo total: ${fosforo}\n
        Nitrato: ${nitrato}\n
        Nitrito:  ${nitrito}\n
        Nitrogênio amoniacal total: ${nitrogenio}\n
        Nitrogênio Total: ${nitrogenioTotal}\n
        Sólidos totais: ${solidos}\n
        Turbidez: ${turbidez}\n`;

        
        const areaTexto = document.getElementById('areaTexto');
        areaTexto.value = textoPadrao;
        areaTexto.style.display = 'block';

       
        document.getElementById('downloadBtn').style.display = 'block';

 
        document.getElementById('downloadBtn').addEventListener('click', function() {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();

            

            // --------- CAPA ---------
            
            const imgUrlCanto = 'img/logoEcolizarBlack.png'; 
            doc.addImage(imgUrlCanto, 'JPEG', 10, 10, 40, 40); 

      
            doc.setFontSize(24);
            doc.text(nome, doc.internal.pageSize.getWidth() / 2, doc.internal.pageSize.getHeight() / 2 - 10, { align: 'center' });
            doc.setFontSize(16);
            doc.text(`${municipio}/${uf}`, doc.internal.pageSize.getWidth() / 2, doc.internal.pageSize.getHeight() / 2 + 10, { align: 'center' });

          
            doc.setFontSize(12);
            doc.text(data, doc.internal.pageSize.getWidth() / 2, doc.internal.pageSize.getHeight() - 10, { align: 'center' });

         
            doc.addPage();

            // --------- RELATÓRIO ---------
           
            const imgUrlFundo = 'img/fundoRelatorio.png'; 
            const imgWidthFundo = 200; 
            const imgHeightFundo = 120; 
            const imgXPosFundo = (doc.internal.pageSize.getWidth() - imgWidthFundo) / 2; 
            const imgYPosFundo = (doc.internal.pageSize.getHeight() - imgHeightFundo) / 2; 
            doc.addImage(imgUrlFundo, 'JPEG', imgXPosFundo, imgYPosFundo, imgWidthFundo, imgHeightFundo);
            doc.addImage(imgUrlCanto, 'JPEG', 3 , 25, 40, 40); 

            
            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();
            const margin = 10; 
            const textStartY = 70; 
            const maxWidth = 180; 
            const linhas = doc.splitTextToSize(textoPadrao, maxWidth);

        
            function addTextToPage(lines, startY) {
                let yPos = startY;
                for (const linha of lines) {
                    if (yPos > (pageHeight - margin)) { 
                        doc.addPage(); 
                        doc.addImage(imgUrlFundo, 'JPEG', imgXPosFundo, imgYPosFundo, imgWidthFundo, imgHeightFundo);
                        doc.addImage(imgUrlCanto, 'JPEG', 3, 25, 40, 40); 
                        yPos = textStartY; 
                    }
                    doc.text(linha, margin, yPos);
                    yPos += 10; 
                }
            }
            

       
            addTextToPage(linhas, textStartY);

            
            doc.save(`nascente_${nome}.pdf`);
        });
    });

