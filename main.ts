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
				aliasBefore = linkAsHTML.substr(0,barIndex);
				aliasAfter = linkAsHTML.substr(barIndex+2);
				comma = ",";
				alias = "";
				console.log("AliasBefore: "+aliasBefore);
				console.log("AliasAfter: "+aliasAfter);
				alias.concat(aliasBefore.toString());
				alias.concat(comma.toString());
				alias.concat(aliasAfter.toString());
				console.log("Alias: "+alias);
				(linkElements[i] as HTMLElement).innerText = alias;
			}
		}
		this.registerMarkdownPostProcessor(postProc);
	}
}
