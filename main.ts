import { App, Plugin, MarkdownPostProcessor, MarkdownPostProcessorContext } from 'obsidian';

export default class LinkHeadersDirectly extends Plugin {

	async onload() {

		let postProc: MarkdownPostProcessor;

		postProc = (el: HTMLElement, ctx: MarkdownPostProcessorContext) => {

			let linkElements = el.querySelectorAll('a.internal-link');
			let barIndex, aliasBefore,aliasAfter,comma,alias;

			for(let i = 0; i < linkElements.length; i++) {

				let linkAsHTML = (linkElements[i] as HTMLElement).innerText;

				barIndex = linkAsHTML.indexOf(">");
				if(barIndex < 0) continue;
				aliasBefore = linkAsHTML.substr(0,barIndex-1);
				aliasAfter = linkAsHTML.substr(barIndex+2);
				comma = ",";
				alias = "";
				alias = alias.concat(aliasBefore,comma,aliasAfter);
				/*alias = alias.concat(comma);*/
				/*alias = alias.concat(aliasAfter);*/
				(linkElements[i] as HTMLElement).innerText = alias;
			}
		}
		this.registerMarkdownPostProcessor(postProc);
	}
}
